import { Injectable } from '@angular/core';
import { User, UserForAuth } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: UserForAuth[] = [];

  register(user: UserForAuth): User {
    this.users.push(user);

    const { password, ...newUser } = user;
    return newUser;
  }

  validateUsersInfo(email: string, password: string): User | null {
    const user = this.users.find((u) => u.email === email && u.password === password);

    if (!user) return null;
    const { password: _, ...publicUser } = user;
    return publicUser;
  }
}
