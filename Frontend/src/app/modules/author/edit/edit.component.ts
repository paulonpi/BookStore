import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../models/author';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  authorForm: FormGroup;
  authorId!: number;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAuthor();
  }

  private loadAuthor(): void {
    this.authorService.getAuthor(this.authorId).subscribe({
      next: (author: Author) => {
        this.authorForm.patchValue({
          name: author.name
        });
      },
      error: (error) => {
        this.errorMessage = 'Error loading author details';
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      const updatedAuthor: Author = {
        id: this.authorId,
        name: this.authorForm.value.name
      };

      this.authorService.updateAuthor(this.authorId, updatedAuthor).subscribe({
        next: () => {
          this.router.navigate(['/authors']);
        },
        error: (error) => {
          this.errorMessage = 'Error updating author';
          console.error('Error:', error);
        }
      });
    }
  }
}
