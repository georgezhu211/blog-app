import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Post, PostsApi } from '../posts-api';
import { form, FormField, required, maxLength } from '@angular/forms/signals';

@Component({
  selector: 'app-post-form',
  imports: [FormField],
  templateUrl: './post-form.html',
})
export class PostForm {
  private postsApi = inject(PostsApi);
  private router = inject(Router);

  postModel = signal<Omit<Post, 'id'>>({
    title: '',
    content: '',
  });

  postForm = form(this.postModel, (schema) => {
    required(schema.title, { message: 'Title is required' });
    maxLength(schema.title, 255, { message: 'Title must be 255 characters or less' });

    required(schema.content, { message: 'Content is required' });
    maxLength(schema.content, 5000, { message: 'Content must be 5000 characters or less' });
  });

  error = signal('');

  onSubmit(event: Event) {
    event.preventDefault();
    this.error.set('');

    if (this.postForm().invalid()) {
      return;
    }

    this.postsApi.create(this.postModel()).subscribe({
      next: () => this.router.navigate(['/posts']),
      error: () => this.error.set('Failed to save post. Please try again.'),
    });
  }
}
