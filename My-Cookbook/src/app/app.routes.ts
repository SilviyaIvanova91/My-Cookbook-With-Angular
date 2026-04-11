import { Routes } from '@angular/router';

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
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
];
