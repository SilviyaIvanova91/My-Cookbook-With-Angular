import { createReducer, on } from "@ngrx/store";
import { initialRecipeState } from "./recipes.state";
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from "./recipes.actions";
import { RecipeState } from "../../../shared/interfaces/recipe-state";

export const recipesReducer = createReducer(
  initialRecipeState,

  on(
    loadRecipes,
    (state): RecipeState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
  ),

  on(
    loadRecipesSuccess,
    (state, { recipes }): RecipeState => ({
      ...state,
      recipes,
      isLoading: false,
    }),
  ),

  on(
    loadRecipesFailure,
    (state, { error }): RecipeState => ({
      ...state,
      isLoading: false,
      error,
    }),
  ),
);