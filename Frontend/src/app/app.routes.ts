import { Routes } from '@angular/router';
import { ListComponent } from './modules/book/list/list.component';
import { EditComponent } from './modules/book/edit/edit.component';
import { AddComponent } from './modules/book/add/add.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: ListComponent,
  },
  {
    path: 'books/edit/:id',
    component: EditComponent
  },
  {
    path: 'books/add',
    component: AddComponent
  }
];
