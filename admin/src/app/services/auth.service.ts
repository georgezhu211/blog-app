import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  signup(username: string, password: string): Observable<object> {
    return this.http.post('http://localhost:3000/signup', { username, password });
  }

  login(username: string, password: string): Observable<object> {
    return this.http.post('http://localhost:3000/login', { username, password });
  }
}
