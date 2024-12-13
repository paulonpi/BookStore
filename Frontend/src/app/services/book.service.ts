import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Book } from '../models/book';

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

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }

  updateBook(id: number, book: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${id}`, book);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  getPaginatedBooks(pageNumber: number, pageSize: number): Observable<PaginatedBooksResponse> {
    return this.http.get<PaginatedBooksResponse>(`${this.apiUrl}/books/paginated`, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString()
      }
    });
  }
}
