import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { University } from '../models/university';


@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) { }

  get(idCity: number): Observable<University[]> {
    return  this.http.get<University[]>(environment.apiUrl + 'University/' + idCity)
  }
}
