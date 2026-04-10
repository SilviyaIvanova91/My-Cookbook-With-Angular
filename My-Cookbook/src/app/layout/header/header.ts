import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthnService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  private authService = inject(AuthnService);
  private router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;

  username = computed(() => this.authService.currentUser()?.username ?? '');

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
