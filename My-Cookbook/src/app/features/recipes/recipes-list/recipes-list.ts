import { Component, inject, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/interfaces/recipe';
import { ApiService } from '../../../core/services/api.service';
import { RecipeComponent } from '../../../shared/components/recipe/recipe';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectRecipesSortedByComments,
} from '../../../core/store/recipes/recipes.selectors';
import { loadRecipes, loadRecipesSuccess } from '../../../core/store/recipes/recipes.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipes-list',
  imports: [RecipeComponent, RouterLink, AsyncPipe],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.css',
})
export class RecipesListComponent implements OnInit {
  private authService = inject(AuthService);

  recipes$: Observable<Recipe[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private apiService: ApiService,
    private store: Store,
  ) {
    this.recipes$ = this.store.select(selectRecipesSortedByComments);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  user = this.authService.isLoggedIn() ? this.authService.currentUser() : null;

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());

    this.apiService.getRecipes().subscribe((recipes) => {
      this.store.dispatch(loadRecipesSuccess({ recipes }));
    });
  }
}
