import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Post, PostsApi } from '../posts-api';
import { form, FormField } from '@angular/forms/signals';

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

  postForm = form(this.postModel);

  onSubmit(event: Event) {
    event.preventDefault();

    this.postsApi.create(this.postModel()).subscribe(() => {
      this.router.navigate(['/posts']);
    });
  }
}
