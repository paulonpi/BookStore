import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

interface Subject {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects`);
  }
}
