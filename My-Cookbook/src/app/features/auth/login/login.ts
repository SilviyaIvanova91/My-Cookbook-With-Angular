import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthnService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private authService = inject(AuthnService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/recipes']),
      error: (err) => {
        this.error = err.error?.message || 'Login failed. Please try again.';
      },
    });
  }
}
