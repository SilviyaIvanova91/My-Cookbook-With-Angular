import { Component, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthnService } from '../../../core/services/auth';
import { Recipe } from '../../../shared/interfaces/recipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [FormsModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private authService = inject(AuthnService);

  recipe!: Recipe;
  commentText = '';
  recipeId = '';

  currentUsername = computed(() => this.authService.currentUser()?.username ?? 'Anonymous');

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

  postComment(): void {
    const text = this.commentText.trim();
    if (!text || !this.recipe) return;

    const comment = { username: this.currentUsername(), text };
    this.apiService.addComment(this.recipeId, comment).subscribe((newComment) => {
      this.recipe!.comments.push(newComment);
      this.commentText = '';
    });
  }
}
