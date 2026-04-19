import { Component, inject, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/interfaces/recipe';
import { ApiService } from '../../../core/services/api.service';
import { RecipeComponent } from '../../../shared/components/recipe/recipe';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-recipes-list',
  imports: [RecipeComponent, RouterLink],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.css',
})
export class RecipesListComponent implements OnInit {
  private authService = inject(AuthService);

  recipes: Recipe[] = [];
  user = this.authService.isLoggedIn() ? this.authService.currentUser() : null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
