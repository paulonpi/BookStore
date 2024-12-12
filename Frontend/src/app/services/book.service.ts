import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

interface PaginatedBooksResponse {
  books: {
    id: number;
    title: string;
    price: number;
    subject: {
      id: number;
      name: string;
    };
    authors: {
      id: number;
      name: string;
    }[];
  }[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/books`);
  }

  getPaginatedBooks(pageNumber: number, pageSize: number): Observable<PaginatedBooksResponse> {
    return this.http.get<PaginatedBooksResponse>(`${this.apiUrl}/Books/paginated`, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString()
      }
    });
  }
}
