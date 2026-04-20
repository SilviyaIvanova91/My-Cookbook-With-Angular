import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from '../../../shared/interfaces/recipe-state';

export const selectRecipesState = createFeatureSelector<RecipeState>('recipes');

export const selectAllRecipes = createSelector(selectRecipesState, (state) => state.recipes);

export const selectIsLoading = createSelector(selectRecipesState, (state) => state.isLoading);

export const selectRecipesError = createSelector(selectRecipesState, (state) => state.error);

export const selectRecipesSortedByComments = createSelector(selectAllRecipes, (recipes) =>
  [...recipes].sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)),
);
