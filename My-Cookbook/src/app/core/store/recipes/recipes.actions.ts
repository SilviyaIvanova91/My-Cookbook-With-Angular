import { createAction, props } from '@ngrx/store';
import { Recipe } from '../../../shared/interfaces/recipe';

export const loadRecipes = createAction('[Recipes] Load All');

export const loadRecipesSuccess = createAction(
  '[Recipes] Load All Success',
  props<{ recipes: Recipe[] }>(),
);

export const loadRecipesFailure = createAction(
  '[Recipes] Load All Failure',
  props<{ error: string }>(),
);
