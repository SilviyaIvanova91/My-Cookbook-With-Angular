import { Recipe } from './recipe';

export interface RecipeState {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
}
