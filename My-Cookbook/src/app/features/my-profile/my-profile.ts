import { Component, inject } from '@angular/core';
import { AuthnService } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  imports: [RouterLink],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfileComponent {
  private authService = inject(AuthnService);
  private router = inject(Router);

  user = this.authService.currentUser;

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
