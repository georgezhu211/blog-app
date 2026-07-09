import { Component, inject } from '@angular/core';
import { PostsApi } from '../posts-api';

@Component({
  selector: 'app-post-list',
  imports: [],
  templateUrl: './post-list.html',
})
export class PostList {
  private postsApi = inject(PostsApi);
  posts = this.postsApi.getAll();
}
