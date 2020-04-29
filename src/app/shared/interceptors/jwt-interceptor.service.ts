import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap, share, tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  private inflightAuthRequest = null;

  constructor(
    private loginS: LoginService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('authExempt') === 'true') {
      return next.handle(request);
    }

    if (!this.inflightAuthRequest) {
      this.inflightAuthRequest = this.loginS.getToken();
    }

    return this.inflightAuthRequest.pipe(
      switchMap((newToken: string) => {
        this.inflightAuthRequest = null;

        const authReq = request.clone({
          headers: request.headers.set('Authorization', newToken ? 'Bearer ' + newToken : '')
        });

        return next.handle(authReq);
      }),
      tap(ev => {
        if (ev instanceof HttpResponse && ev.status === 205) {
          this.loginS.logout();
        }
      }),
      catchError(error => {
        if (error.status === 401) {

          if (!this.inflightAuthRequest) {
            this.inflightAuthRequest = this.loginS.refreshAccessToken();

            if (!this.inflightAuthRequest) {
              localStorage.clear();
              return throwError(error);
            }
          }

          return this.inflightAuthRequest.pipe(
            switchMap((newToken: string) => {
              this.inflightAuthRequest = null;

              const authReqRepeat = request.clone({
                headers: request.headers.set('token', newToken)
              });

              return next.handle(authReqRepeat);
            }),
            catchError(err => {
              this.inflightAuthRequest = null;
              return throwError(error);
            })
          );
        } else {
          this.inflightAuthRequest = null;
          return throwError(error);
        }
      })
    );
  }
}
