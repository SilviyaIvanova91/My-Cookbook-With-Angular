import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';
import { recipesReducer } from './recipes.reducer';
import { initialRecipeState } from './recipes.state';
import { Recipe } from '../../../shared/interfaces/recipe';
import { RecipeState } from '../../../shared/interfaces/recipe-state';

describe('Recipes Reducer', () => {
  describe('loadRecipes', () => {
    it('should set isLoading to true', () => {
      const action = loadRecipes();
      const result = recipesReducer(initialRecipeState, action);

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadRecipesSuccess', () => {
    it('should load recipes and set isLoading to false', () => {
      const mockRecipes: Recipe[] = [
        {
          _id: '1',
          name: 'Spaghetti Bolognese',
          description: 'A classic Italian pasta dish',
          owner: 'user1',
          ingredients: 'Spaghetti, ground beef, tomato sauce',
          instructions: 'Cook spaghetti, prepare sauce, combine',
          imageUrl: 'https://example.com/spaghetti.jpg',
        },
      ];

      const action = loadRecipesSuccess({ recipes: mockRecipes });

      const state: RecipeState = { ...initialRecipeState, isLoading: true };

      const result = recipesReducer(state, action);

      expect(result.recipes).toEqual(mockRecipes);
      expect(result.isLoading).toBe(false);
    });
  });

  describe('loadRecipesFailure', () => {
    it('should set error and isLoading to false', () => {
      const action = loadRecipesFailure({ error: 'Failed to load' });

      const state: RecipeState = { ...initialRecipeState, isLoading: true };

      const result = recipesReducer(state, action);

      expect(result.error).toBe('Failed to load');
      expect(result.isLoading).toBe(false);
    });
  });
});
