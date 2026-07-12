import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, AuthResponse } from '../../../core/services/auth.service';
import { form, FormField, required } from '@angular/forms/signals';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginModel = signal({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schema) => {
    required(schema.username, { message: 'Username is required' });
    required(schema.password, { message: 'Password is required' });
  });

  error = signal('');
  submitting = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.error.set('');

    if (this.submitting() || this.loginForm().invalid()) {
      return;
    }

    this.submitting.set(true);
    const { username, password } = this.loginModel();

    this.authService
      .login(username, password)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (response: AuthResponse) => {
          this.authService.setToken(response.token);
          this.router.navigate(['/dashboard']);
        },
        error: () => this.error.set('Login failed. Please check your credentials.'),
      });
  }
}
