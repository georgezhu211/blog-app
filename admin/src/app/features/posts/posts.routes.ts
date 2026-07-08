// posts.routes.ts
import { Routes } from '@angular/router';

export const postsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./post-list/post-list').then((m) => m.PostList),
  },
  {
    path: 'new',
    loadComponent: () => import('./post-form/post-form').then((m) => m.PostForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./post-detail/post-detail').then((m) => m.PostDetail),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./post-form/post-form').then((m) => m.PostForm),
  },
];
