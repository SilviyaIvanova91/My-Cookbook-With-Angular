import { inject, Injectable } from '@angular/core';
import { ProfileUpdateData, User, UserForAuth } from '../../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/profile`, { withCredentials: true });
  }

  updateProfile(data: ProfileUpdateData): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/profile`, data, { withCredentials: true });
  }
}
