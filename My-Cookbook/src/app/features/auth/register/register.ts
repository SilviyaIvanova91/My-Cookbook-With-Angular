import { Component, inject } from '@angular/core';
import { AuthnService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private authService = inject(AuthnService);
  private router = inject(Router);

  username = '';
  email = '';
  password = '';
  confirmPass = '';
  error = '';
  tel = 0;

  onRegister(): void {
    this.error = '';

    if (!this.username) {
      this.error = 'Username is required';
      return;
    }
    if (!this.email) {
      this.error = 'Email is required';
      return;
    }
    if (!this.password) {
      this.error = 'Password is required';
      return;
    }
    if (this.password !== this.confirmPass) {
      this.error = "Passwords don't match";
      return;
    }

    this.authService
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
        tel: this.tel.toString(),
      })
      .subscribe({
        next: () => this.router.navigate(['/recipes']),
        error: (err) => {
          this.error = err.error?.message || 'Registration failed. Please try again.';
        },
      });
  }
}
