import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface Post {
  id: number;
  title: string;
  content: string;
}

@Service()
export class PostsApi {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/api/posts`;

  getAll() {
    return this.http.get<Post[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  create(post: Omit<Post, 'id'>) {
    return this.http.post<Post>(this.url, post);
  }

  update(id: number, post: Omit<Post, 'id'>) {
    return this.http.put<Post>(`${this.url}/${id}`, post);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
