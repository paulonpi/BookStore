import { Routes } from '@angular/router';

import { ListComponent } from './modules/book/list/list.component';

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
];
