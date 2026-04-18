import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordsMatchValidator } from '../../../shared/validators/password-match.validator';
import { emailValidator } from '../../../shared/validators/email.validator';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, emailValidator()]],
    tel: [''],
    passwords: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPass: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator },
    ),
  });

  isLoading = false;

  get passwordsGroup(): FormGroup {
    return this.registerForm.get('passwords') as FormGroup;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { username, email, tel, passwords } = this.registerForm.value;

    const userData = {
      username,
      email,
      tel: tel ? tel : undefined,
      password: passwords.password,
    };

    this.authService.register(userData).subscribe({
      next: (user) => {
        this.authService.setSession(user);
        this.isLoading = false;
        this.notificationService.showSuccess('Registration successful!');
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.showError(err.error?.message || 'Registration failed. Try again');
      },
    });
  }
}
