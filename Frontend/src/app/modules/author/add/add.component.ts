import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../models/author';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  authorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.authorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      const author: Author = {
        id: 0, // The backend will assign the actual ID
        name: this.authorForm.value.name
      };

      this.authorService.createAuthor(author).subscribe({
        next: () => {
          this.router.navigate(['/authors']);
        },
        error: (error) => {
          console.error('Error adding author:', error);
        }
      });
    }
  }
}
