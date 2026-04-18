import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InputErrorDirective } from '../../../shared/directives/input-error';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-new-recipe',
  imports: [FormsModule, InputErrorDirective],
  templateUrl: './new-recipe.html',
  styleUrl: './new-recipe.css',
})
export class NewRecipeComponent {
  @ViewChild('recipeForm') recipeForm!: NgForm;

  name = '';
  description = '';
  ingredients = '';
  instructions = '';
  imageUrl = '';
  isLoading = false;

  private router = inject(Router);
  private apiService = inject(ApiService);
  private notificationService = inject(NotificationService);

  onSubmit() {
    if (this.recipeForm.invalid) {
      return;
    }

    this.isLoading = true;

    const newRecipe = {
      _id: this.generateUniqueId(),
      name: this.name,
      description: this.description,
      ingredients: this.ingredients,
      instructions: this.instructions,
      imageUrl: this.imageUrl,
    };

    this.apiService.createRecipe(newRecipe).subscribe({
      next: (recipe) => {
        this.isLoading = false;
        console.log(`Recipe created: ${recipe.name}`);
        this.notificationService.showSuccess('Recipe created successfully!');
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.showError(
          err.error?.message || 'Failed to create recipe. Please try again.',
        );
      },
    });
  }

  onCancel() {
    this.notificationService.showError('Create mode cancelled');
    this.router.navigate(['/recipes']);
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
