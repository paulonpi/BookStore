import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../../../models/author';
import { AuthorService } from '../../../services/author.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-author-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  standalone: true
})
export class ListComponent implements OnInit {
  authors: Author[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private authorService: AuthorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.loading = true;
    this.authorService.getAuthors().subscribe({
      next: (authors) => {
        this.authors = authors;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading authors';
        this.loading = false;
        console.error('Error loading authors:', error);
      }
    });
  }

  deleteAuthor(id: number): void {
    if (confirm('Are you sure you want to delete this author?')) {
      this.authorService.deleteAuthor(id).subscribe({
        next: () => {
          this.authors = this.authors.filter(author => author.id !== id);
        },
        error: (error) => {
          this.error = 'Error deleting author';
          console.error('Error deleting author:', error);
        }
      });
    }
  }

  addAuthor(): void {
    this.router.navigate(['/authors/add']);
  }

  editAuthor(id: number): void {
    this.router.navigate(['/authors', 'edit',id]);
  }
}
