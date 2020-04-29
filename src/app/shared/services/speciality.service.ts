import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Speciality } from '../models/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private http: HttpClient) { }

  get(idCity: number): Observable<Speciality[]> {
    return this.http.get<Speciality[]>(environment.apiUrl + 'Specialty/' + idCity)
  }
}
