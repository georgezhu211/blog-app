import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
})
export class SignupComponent {
  private authService = inject(AuthService);

  username = '';
  password = '';

  onSubmit() {
    this.authService.signup(this.username, this.password).subscribe({
      next: (response) => console.log('Signup successful:', response),
      error: (error) => console.error('Signup failed:', error),
    });
  }
}
