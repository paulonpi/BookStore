import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { AuthorService } from '../../../services/author.service';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../models/subject';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Author } from '../../../models/author';

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
  subjects: Subject[] = []; 
  authors: Author[] = [];
  isAddingNewSubject = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private subjectService: SubjectService,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      subject: ['', Validators.required],
      authors: [[], Validators.required],
      newSubject: ['']
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

  onSubjectChange(event: any) {
    if (event.target.value === 'new') {
      this.isAddingNewSubject = true;
      this.bookForm.get('subject')?.setValue('');
    }
  }

  async saveNewSubject() {
    const newSubjectName = this.bookForm.get('newSubject')?.value;
    if (newSubjectName) {
      const newSubject: Subject = { id: 0, name: newSubjectName };
      this.subjectService.addSubject(newSubject).subscribe({
        next: (newSubjectResponse) => {
          this.subjects.push(newSubjectResponse);
          this.bookForm.get('subject')?.setValue(newSubjectResponse.id);
          this.isAddingNewSubject = false;
          this.bookForm.get('newSubject')?.setValue('');
        },
        error: (error) => console.error('Error creating new subject:', error)
      });
    }
  }

  cancelNewSubject() {
    this.isAddingNewSubject = false;
    this.bookForm.get('newSubject')?.setValue('');
  }
}
