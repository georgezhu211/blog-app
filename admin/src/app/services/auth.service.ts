import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthUser {
  id: number;
  username: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  signup(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:3000/signup', { username, password });
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:3000/login', { username, password });
  }
}
