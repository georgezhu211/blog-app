import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private authService = inject(AuthService);

  username = '';
  password = '';

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => console.log('Login successful:', response),
      error: (error) => console.error('Login failed:', error),
    });
  }
}
