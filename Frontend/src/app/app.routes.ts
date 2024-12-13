import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule)
  },
  {
    path: 'authors',
    loadChildren: () => import('./modules/author/author.module').then(m => m.AuthorModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('./modules/subject/subject.module').then(m => m.SubjectModule)
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  }
];
