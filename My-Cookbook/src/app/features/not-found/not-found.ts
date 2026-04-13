import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFoundComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  goBack(): void {
    const from = this.route.snapshot.queryParamMap.get('from');

    if (from === 'invalid-recipe') {
      this.router.navigate(['/recipes']);
      return;
    }

    this.location.back();
  }
}
