import { Component, inject, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Router } from '@angular/router';
import { DescriptionSlicePipe } from '../../pipes/description-slice-pipe';

@Component({
  selector: 'app-recipe',
  imports: [DescriptionSlicePipe],
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
