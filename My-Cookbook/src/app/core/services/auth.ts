import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthnService {
  private apiService = inject(ApiService);
  private user = signal<User | null>(this.loadSession());

  isLoggedIn = computed(() => this.user() !== null);
  currentUser = computed(() => this.user());

  private loadSession(): User | null {
    const stored = localStorage.getItem('currentUser');
    return stored ? (JSON.parse(stored) as User) : null;
  }

  private saveSession(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user.set(user);
  }

  register(data: { username: string; email: string; password: string }): Observable<User> {
    return this.apiService.register(data).pipe(tap((user) => this.saveSession(user)));
  }

  login(email: string, password: string): Observable<User> {
    return this.apiService.login({ email, password }).pipe(tap((user) => this.saveSession(user)));
  }

  logout(): void {
    this.apiService.logout().subscribe();
    this.user.set(null);
    localStorage.removeItem('currentUser');
  }
}
