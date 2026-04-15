import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.HomeComponent),
  },

  {
    path: 'recipes',
    loadComponent: () => import('./features/recipes/reciepes').then((m) => m.ReciepesComponent),
  },
  {
    path: 'recipes/:recipeId',
    loadComponent: () =>
      import('./features/recipes/recipes-detail/recipe-detail').then(
        (m) => m.RecipeDetailComponent,
      ),
  },
  {
    path: 'new-recipe',
    loadComponent: () =>
      import('./features/recipes/new-recipe/new-recipe').then((m) => m.NewRecipeComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./features/my-profile/my-profile').then((m) => m.MyProfileComponent),
    canActivate: [authGuard],
  },

  {
    path: 'not-found',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
