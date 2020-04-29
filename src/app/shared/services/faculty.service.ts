import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GroupedFaculty } from '../models/grouped-faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private http: HttpClient) { }

  get(idUniversity: number): Observable<GroupedFaculty[]> {
    return this.http.get<GroupedFaculty[]>(environment.apiUrl + 'Faculty/' + idUniversity)    
  }
}
