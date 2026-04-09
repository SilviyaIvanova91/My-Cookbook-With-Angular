import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { UserService } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthnService {
  private userService = inject(UserService);
  private user = signal<User | null>(null);

  isLoggedIn = computed(() => this.user() !== null);
  currentUser = computed(() => this.user());

  login(email: string, password: string): boolean {
    const IsUser = this.userService.validateUsersInfo(email, password);

    if (IsUser) {
      this.user.set(IsUser);
      return true;
    }
    return false;
  }

  setSession(user: User): void {
    this.user.set(user);
  }

  logout(): void {
    this.user.set(null);
  }
}
