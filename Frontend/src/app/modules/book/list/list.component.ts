import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  books: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getPaginatedBooks(this.currentPage, this.pageSize).subscribe((data) => {
      this.books = data.books;
      this.totalItems = data.totalCount;
      this.calculateTotalPages();
      this.loading = false;
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBooks();
    }
  }

  getAuthorNames(authors: any[]): string {
    return authors.map(author => author.name).join(', ');
  }

  deleteBook(bookId: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== bookId);
        },
        error: (error) => {
          this.error = 'Failed to delete book';
          console.error('Error deleting book:', error);
        }
      });
    }
  }

  editBook(id: number): void {
    this.router.navigate(['/books/edit', id]);
  }

  addNewBook(): void {
    this.router.navigate(['/books/add']);
  }
}
