import { Component, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe',
  imports: [],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class RecipeComponent {
  @Input({ required: true }) recipe!: Recipe;
}
