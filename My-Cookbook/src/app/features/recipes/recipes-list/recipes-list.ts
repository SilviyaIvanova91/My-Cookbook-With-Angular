import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/interfaces/recipe';
import { ApiService } from '../../../core/services/api.service';
import { RecipeComponent } from '../../../shared/components/recipe/recipe';

@Component({
  selector: 'app-recipes-list',
  imports: [RecipeComponent],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.css',
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
