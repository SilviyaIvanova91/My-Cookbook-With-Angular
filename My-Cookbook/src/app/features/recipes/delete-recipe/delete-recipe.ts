import { Component, inject, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/interfaces/recipe';
import { AuthService } from '../../../core/services/auth';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-recipe',
  imports: [],
  templateUrl: './delete-recipe.html',
  styleUrl: './delete-recipe.css',
})
export class DeleteRecipeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  recipe!: Recipe;
  recipeId = '';

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.params['recipeId'];
    this.loadRecipe();
  }

  loadRecipe(): void {
    this.apiService.getRecipeById(this.recipeId).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
      },
      error: () => {
        this.router.navigate(['/not-found'], { queryParams: { from: 'invalid-recipe' } });
      },
    });
  }

  isRecipeOwner(): boolean {
    const currentUser = this.authService.currentUser();
    if (!currentUser || !this.recipe) {
      return false;
    }

    return this.recipe.owner === currentUser._id;
  }

  onDelete(): void {
    if (!this.isRecipeOwner()) {
      return;
    }

    this.apiService.deleteRecipe(this.recipeId).subscribe({
      next: () => {
        this.router.navigate(['/recipes'], { queryParams: { deleted: 'true' } });
      },
      error: () => {
        this.router.navigate(['/not-found'], { queryParams: { from: 'invalid-recipe' } });
      },
    });
  }

  onCancel(): void {
    this.router.navigate([`/recipes/${this.recipeId}`]);
  }
}
