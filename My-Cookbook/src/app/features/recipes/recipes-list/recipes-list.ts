import { Component, inject, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/interfaces/recipe';
import { ApiService } from '../../../core/services/api.service';
import { RecipeComponent } from '../../../shared/components/recipe/recipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  imports: [RecipeComponent, RouterLink],
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
