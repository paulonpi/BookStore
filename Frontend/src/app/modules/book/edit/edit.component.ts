import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service'; 
import { SubjectService } from '../../../services/subject.service';
import { AuthorService } from '../../../services/author.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  bookForm: FormGroup;
  bookId!: number;
  subjects: any[] = [];
  authors: any[] = [];
  selectedAuthors: number[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private subjectService: SubjectService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      subjectId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get book ID from route parameter
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Load book details
    this.loadBook();
    
    // Load subjects and authors
    this.loadSubjects();
    this.loadAuthors();
  }

  loadBook(): void {
    this.bookService.getBook(this.bookId).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          price: book.price,
          subjectId: book.subject.id
        });
        this.selectedAuthors = book.authors.map(author => author.id);
      },
      error: (error) => {
        console.error('Error loading book:', error);
        // Optionally add error handling/user notification here
      }
    });
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: (error) => {
        console.error('Error loading subjects:', error);
      }
    });
  }

  loadAuthors(): void {
    this.authorService.getAuthors().subscribe({
      next: (authors) => {
        this.authors = authors;
      },
      error: (error) => {
        console.error('Error loading authors:', error);
      }
    });
  }

  onAuthorChange(event: Event, authorId: number): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedAuthors.push(authorId);
    } else {
      const index = this.selectedAuthors.indexOf(authorId);
      if (index > -1) {
        this.selectedAuthors.splice(index, 1);
      }
    }
  }

  isAuthorSelected(authorId: number): boolean {
    return this.selectedAuthors.includes(authorId);
  }

  onSubmit(): void {
    if (this.bookForm.valid && this.selectedAuthors.length > 0) {
      const bookData = {
        ...this.bookForm.value,
        subject: {
          id: this.bookForm.value.subjectId
        },
        authors: this.selectedAuthors.map(authorId => ({ id: authorId }))
      };

      // Remove the subjectId from the root level since it's now nested
      delete bookData.subjectId;

      this.bookService.updateBook(this.bookId, bookData).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error updating book:', error);
          // Optionally add error handling/user notification here
        }
      });
    }
  }
}
