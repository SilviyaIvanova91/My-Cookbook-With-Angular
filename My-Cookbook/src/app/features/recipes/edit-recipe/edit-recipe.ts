import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../shared/interfaces/recipe';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification';
import { AuthService } from '../../../core/services/auth';
import { InputErrorDirective } from '../../../shared/directives/input-error';

@Component({
  selector: 'app-edit-recipe',
  imports: [FormsModule, InputErrorDirective],
  templateUrl: './edit-recipe.html',
  styleUrl: './edit-recipe.css',
})
export class EditRecipeComponent implements OnInit {
  @ViewChild('updateRecipeForm') updateRecipeForm!: NgForm;

  editName = '';
  editDescription = '';
  editIngredients = '';
  editInstructions = '';
  editImageUrl = '';

  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  recipe!: Recipe;
  recipeId!: string;

  isEditMode = signal(false);
  isLoading = signal(false);

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('recipeId')!;
    this.loadRecipe();
  }

  loadRecipe(): void {
    this.apiService.getRecipeById(this.recipeId).subscribe({
      next: (recipe) => {
        const currentUser = this.authService.currentUser();

        if (!currentUser || recipe.owner !== currentUser._id) {
          this.notificationService.showError('You can edit only your own recipes.');
          this.router.navigate(['/recipes', this.recipeId]);
          return;
        }

        this.recipe = recipe;
      },
      error: () => {
        this.router.navigate(['/not-found'], { queryParams: { from: 'invalid-recipe' } });
      },
    });
  }

  onSave(updateRecipeForm: NgForm): void {
    if (updateRecipeForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.notificationService.showSuccess('Saving recipe...');

    const updatedRecipe = {
      name: this.recipe.name,
      description: this.recipe.description,
      ingredients: this.recipe.ingredients,
      instructions: this.recipe.instructions,
      imageUrl: this.recipe.imageUrl,
    };

    this.apiService.updateRecipe(this.recipeId, updatedRecipe).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.notificationService.showSuccess('Recipe updated successfully!');
        this.router.navigate(['/recipes', this.recipeId]);
      },
      error: () => {
        this.isLoading.set(false);
        this.notificationService.showError('Failed to update recipe.');
      },
    });
  }

  onCancel(): void {
    this.notificationService.showError('Your changes have been discarded');
    this.router.navigate(['/recipes', this.recipeId]);
  }
}
