import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostsApi } from '../posts-api';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink],
  templateUrl: './post-list.html',
})
export class PostList {
  private postsApi = inject(PostsApi);
  posts = this.postsApi.getAll();
}
