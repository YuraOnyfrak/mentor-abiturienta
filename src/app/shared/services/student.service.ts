import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreateStudent } from '../models/Student/create-student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  post(model: CreateStudent){
    return this.http.post(environment.apiUrl +'Student', model);
  }

  get(){
    return this.http.get(environment.apiUrl +'Student');
  }
}
