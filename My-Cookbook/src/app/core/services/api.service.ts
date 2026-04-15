import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRecipeData, Recipe } from '../../shared/interfaces/recipe';
import { Comment } from '../../shared/interfaces/comments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`);
  }

  getRecipeById(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${recipeId}`);
  }

  createRecipe(data: CreateRecipeData): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.apiUrl}/recipes`, data, { withCredentials: true });
  }

  addComment(recipeId: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/recipes/${recipeId}/comments`, comment, {
      withCredentials: true,
    });
  }

  subscribeToRecipe(recipeId: string): Observable<Recipe> {
    return this.http.put<Recipe>(
      `${this.apiUrl}/recipes/${recipeId}`,
      {},
      { withCredentials: true },
    );
  }

  // private http = inject(HttpClient);
  // private apiUrl = 'http://localhost:3000/api';
  // private options = { withCredentials: true };

  // getRecipes(): Observable<Recipe[]> {
  //   return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`, this.options);
  // }

  // getRecipeById(recipeId: string): Observable<Recipe> {
  //   return this.http.get<Recipe>(`${this.apiUrl}/recipes/${recipeId}`, this.options);
  // }

  // register(data: { username: string; email: string; password: string }): Observable<User> {
  //   return this.http.post<User>(`${this.apiUrl}/register`, data, this.options);
  // }

  // login(data: { email: string; password: string }): Observable<User> {
  //   return this.http.post<User>(`${this.apiUrl}/login`, data, this.options);
  // }

  // logout(): Observable<void> {
  //   return this.http.post<void>(`${this.apiUrl}/logout`, {}, this.options);
  // }

  // getProfile(): Observable<User> {
  //   return this.http.get<User>(`${this.apiUrl}/users/profile`, this.options);
  // }
}
