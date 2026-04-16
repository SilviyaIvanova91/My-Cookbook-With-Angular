import { Component, inject, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { InputErrorDirective } from '../../shared/directives/input-error';
import { EmailValidatorDirective } from '../../shared/directives/email-validator';

@Component({
  selector: 'app-my-profile',
  imports: [FormsModule, InputErrorDirective, EmailValidatorDirective],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfileComponent {
  @ViewChild('profileForm') profileForm!: NgForm;

  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.currentUser;
  isEditMode = signal(false);
  isLoading = signal(false);
  error = signal('');

  editUsername = '';
  editEmail = '';
  editTel = '';

  ngOnInit(): void {
    if (!this.user()) {
      this.authService.getProfile().subscribe({
        next: (user) => this.authService.setSession(user),
        error: () => {},
      });
    }
  }

  editMode(): void {
    const currentUser = this.user();
    if (currentUser) {
      this.editUsername = currentUser.username;
      this.editEmail = currentUser.email;
      this.editTel = currentUser.tel?.replace('+359', '') || '';
    }
    this.error.set('');
    this.isEditMode.set(true);
  }

  onCancel(): void {
    this.error.set('');
    this.isEditMode.set(false);
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    const updateData = {
      username: this.editUsername,
      email: this.editEmail,
      tel: this.editTel ? this.editTel : undefined,
    };

    this.authService.updateProfile(updateData).subscribe({
      next: (user) => {
        this.authService.setSession(user);
        this.isLoading.set(false);
        this.isEditMode.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err.error?.message || 'Failed to update profile');
      },
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearSession();
        this.router.navigate(['/home']);
      },
      error: () => {
        this.authService.clearSession();
        this.router.navigate(['/home']);
      },
    });
  }
}
