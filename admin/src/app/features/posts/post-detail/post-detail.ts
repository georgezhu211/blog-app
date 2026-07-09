import { Component, inject, input } from '@angular/core';
import { PostsApi } from '../posts-api';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.html',
})
export class PostDetail {
  private postsApi = inject(PostsApi);
  id = input.required<string>();
  post = this.postsApi.getById(() => +this.id());
}
