import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRecipeData, Recipe, UpdateRecipeData } from '../../shared/interfaces/recipe';
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

  updateRecipe(recipeId: string, data: UpdateRecipeData): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.apiUrl}/recipes/${recipeId}`, data, {
      withCredentials: true,
    });
  }

  deleteRecipe(recipeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipes/${recipeId}`, { withCredentials: true });
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
}
