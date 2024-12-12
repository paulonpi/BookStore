import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { SubjectService } from '../../../services/subject.service';
import { Book } from '../../../models/book';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  bookForm: FormGroup;
  authors: any[] = [];
  subjects: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private subjectService: SubjectService,
    private router: Router
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      subject: ['', Validators.required],
      authors: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAuthors();
    this.loadSubjects();
  }

  private loadAuthors(): void {
    this.authorService.getAuthors().subscribe({
      next: (authors) => this.authors = authors,
      error: (error) => console.error('Error loading authors:', error)
    });
  }

  private loadSubjects(): void {
    this.subjectService.getSubjects().subscribe({
      next: (subjects) => this.subjects = subjects,
      error: (error) => console.error('Error loading subjects:', error)
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;
      const bookData = {
        title: formValue.title,
        price: formValue.price,
        subject: { id: formValue.subject },
        authors: formValue.authors.map((authorId: number) => ({ id: authorId }))
      };

      this.bookService.addBook(bookData).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (error) => console.error('Error adding book:', error)
      });
    }
  }
}
