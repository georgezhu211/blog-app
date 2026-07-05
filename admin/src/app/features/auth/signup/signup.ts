import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';

  onSubmit() {
    this.authService.signup(this.username, this.password).subscribe({
      next: (response: AuthResponse) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => console.error('Signup failed:', error),
    });
  }
}
