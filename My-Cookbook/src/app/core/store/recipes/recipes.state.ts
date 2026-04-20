import { RecipeState } from "../../../shared/interfaces/recipe-state";

export const initialRecipeState: RecipeState = {
  recipes: [],
  isLoading: false,
  error: null,
};