import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../../../core/services/auth.service';
import { form, FormField, required, minLength, maxLength, pattern } from '@angular/forms/signals';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  templateUrl: './signup.html',
})
export class Signup {
  private authService = inject(AuthService);
  private router = inject(Router);

  signupModel = signal({
    username: '',
    password: '',
  });

  signupForm = form(this.signupModel, (schema) => {
    required(schema.username, { message: 'Username is required' });
    minLength(schema.username, 3, { message: 'Username must be between 3 and 30 characters' });
    maxLength(schema.username, 30, { message: 'Username must be between 3 and 30 characters' });
    pattern(schema.username, /^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    });

    required(schema.password, { message: 'Password is required' });
    minLength(schema.password, 8, { message: 'Password must be at least 8 characters' });
    maxLength(schema.password, 128, { message: 'Password must be 128 characters or less' });
  });

  error = signal('');
  submitting = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.error.set('');

    if (this.submitting() || this.signupForm().invalid()) {
      return;
    }

    this.submitting.set(true);
    const { username, password } = this.signupModel();

    this.authService
      .signup(username, password)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (response: AuthResponse) => {
          this.authService.setToken(response.token);
          this.router.navigate(['/dashboard']);
        },
        error: () => this.error.set('Signup failed. Please try again.'),
      });
  }
}
