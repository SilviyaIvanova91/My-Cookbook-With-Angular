import { Component } from '@angular/core';
import { RecipesListComponent } from './recipes-list/recipes-list';

@Component({
  selector: 'app-reciepes',
  imports: [RecipesListComponent],
  templateUrl: './reciepes.html',
  styleUrl: './reciepes.css',
})

export class ReciepesComponent {}
