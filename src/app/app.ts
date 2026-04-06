import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header';
import { FootherComponent } from './layout/foother/foother';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FootherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('My-Restaurant-With-Angular');
}
