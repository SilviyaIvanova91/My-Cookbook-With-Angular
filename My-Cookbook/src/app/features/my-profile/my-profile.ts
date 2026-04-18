import { Component, inject, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { InputErrorDirective } from '../../shared/directives/input-error';
import { EmailValidatorDirective } from '../../shared/directives/email-validator';
import { NotificationService } from '../../core/services/notification';

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
  private notificationService = inject(NotificationService);

  user = this.authService.currentUser;
  isEditMode = signal(false);
  isLoading = signal(false);

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
    this.notificationService.showSuccess('You can edit your profile now');
    this.isEditMode.set(true);
  }

  onCancel(): void {
    this.notificationService.showError('Your changes have been discarded');
    this.isEditMode.set(false);
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.notificationService.showSuccess('Saving profile successfully');

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
        this.notificationService.showError(err.error?.message || 'Failed to update profile');
      },
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearSession();
        this.notificationService.showSuccess('Logged out successfully');
        this.router.navigate(['/home']);
      },
      error: () => {
        this.authService.clearSession();
        this.notificationService.showError('Failed to log out');
        this.router.navigate(['/home']);
      },
    });
  }
}
