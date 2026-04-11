import { Component, inject, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  imports: [],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class RecipeComponent {
  private router = inject(Router);
  @Input({ required: true }) recipe!: Recipe;

  goToDetails(recipeId: string) {
    this.router.navigate(['/recipes', recipeId]);
  }
}
