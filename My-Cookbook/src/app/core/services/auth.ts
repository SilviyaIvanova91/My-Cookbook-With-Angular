import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  LoginCredentials,
  ProfileUpdateData,
  User,
  UserForAuth,
} from '../../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken //localhost:3000/api';
    () {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';
  private user = signal<User | null>(this.loadSession());

  private loadSession(): User | null {
    const stored = sessionStorage.getItem('currentUser');

    localStorage.removeItem('currentUser');

    return stored ? (JSON.parse(stored) as User) : null;
  }
  private saveSession(user: User): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.user.set(user);
  }

  isLoggedIn = computed(() => this.user() !== null);
  currentUser = computed(() => this.user());

  login(credentials: LoginCredentials): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(tap((user) => this.saveSession(user)));
  }

  register(userData: UserForAuth): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/register`, userData, { withCredentials: true })
      .pipe(tap((user) => this.saveSession(user)));
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/profile`, { withCredentials: true });
  }

  updateProfile(data: ProfileUpdateData): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/profile`, data, { withCredentials: true });
  }

  setSession(user: User): void {
    this.user.set(user);
  }

  clearSession(): void {
    this.user.set(null);
  }

  //   private apiService = inject(ApiService);
  // private user = signal<User | null>(this.loadSession());

  // isLoggedIn = computed(() => this.user() !== null);
  // currentUser = computed(() => this.user());

  // private loadSession(): User | null {
  //   const stored = sessionStorage.getItem('currentUser');

  //   // Cleanup legacy persistent session to ensure tab-scoped authentication.
  //   localStorage.removeItem('currentUser');

  //   return stored ? (JSON.parse(stored) as User) : null;
  // }

  // private saveSession(user: User): void {
  //   sessionStorage.setItem('currentUser', JSON.stringify(user));
  //   this.user.set(user);
  // }

  // register(data: {
  //   username: string;
  //   email: string;
  //   password: string;
  //   tel: string;
  // }): Observable<User> {
  //   return this.apiService.register(data).pipe(tap((user) => this.saveSession(user)));
  // }

  // login(email: string, password: string): Observable<User> {
  //   return this.apiService.login({ email, password }).pipe(tap((user) => this.saveSession(user)));
  // }

  // logout(): void {
  //   this.apiService.logout().subscribe();
  //   this.user.set(null);
  //   sessionStorage.removeItem('currentUser');
  // }
}
