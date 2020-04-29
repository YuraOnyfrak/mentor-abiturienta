import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Specialization } from '../models/specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http: HttpClient) { }

  get(idFaculty: number): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(environment.apiUrl + 'Specialization/' + idFaculty)
  }
}
