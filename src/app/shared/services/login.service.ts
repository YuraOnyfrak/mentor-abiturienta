import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { share, map, catchError } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { TelegramResponse } from '../models/telegram-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private decodedToken: any;
  private userIdentifier: string;

  set userId(id: string) {
    localStorage.setItem('userId', id);
    this.userIdentifier = id;
  }

  get userId(): string {
    if (!this.userIdentifier) {
      this.userIdentifier = localStorage.getItem('userId');
    }

    return this.userIdentifier;
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem('access-token');
    this.decodedToken = token ? this.decodeJWTToken(token) : '';
  }

  getTicket(phone: number | string): Observable<string> {
    return this.http.post<string>(environment.apiUrl + 'accesstokens/validation-tickets-for-users', { number: phone }, {
      headers: {
        'authExempt': 'true',
        'Content-Type': 'application/json-patch+json'
      }
    });
  }

  getUserToken(data: any) {
    return this.http.post(environment.apiUrl + 'auth', data, {
      headers: {
        'authExempt': 'true',
        'Content-Type': 'application/json-patch+json'
      }
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          return throwError('Invalid captcha');
        } else {
          return throwError(err.error ? err.error.error : err.message);
        }
      })
    );
  }

  logIn(data: any) {
    return this.http.post(environment.apiUrl + 'accesstokens', data, { headers: { 'authExempt': 'true' } }).pipe(
      map(resp => {
        this.setTokens(resp);
        return of(resp);
      }),
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 400:
            return throwError(err.error.error);
          default:
            return throwError(err.message);
        }
      })
    );
  }

  telegramAuthentication(data: TelegramResponse) {
    return this.http.post(environment.apiUrl + 'accesstokens/telegram-authentication', data,
     { headers: { 'authExempt': 'true' } })
    .pipe(
      map(resp => {
        this.setTokens(resp);
        return of(resp);
      })//,
      // catchError((err: HttpErrorResponse) => {
      //   switch (err.status) {
      //     case 400:
      //       return throwError(err.error.error);
      //     default:
      //       return throwError(err.message);
      //   }
      // })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/authorization');
  }

  refreshAccessToken() {
    const data = {
      refreshToken: localStorage.getItem('refresh-token')
    };

    return this.http.put(environment.apiUrl + 'accesstokens/refresh-token', data, { headers: { 'authExempt': 'true' } }).pipe(
      share(),
      map(res => this.setTokens(res)),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) this.logout();
        return throwError(err);
      })
    );
  }

  getToken() {
    const token = localStorage.getItem('access-token');

    if (!this.isTokenExpired(this.decodedToken.exp)) {
      return of(token);
    }

    return this.refreshAccessToken();
  }

  private setTokens(resp: any) {
    localStorage.setItem('access-token', resp.jwt);
    localStorage.setItem('refresh-token', resp.refresh);
    this.decodedToken = this.decodeJWTToken(resp.jwt);
    this.userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    return resp.jwt;
  }

  decodeJWTToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
  }

  private isTokenExpired(expStamp: number): boolean {
    if (new Date(expStamp * 1000) < new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
