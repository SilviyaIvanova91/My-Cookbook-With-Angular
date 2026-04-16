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

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
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
  error = '';

  get passwordsGroup(): FormGroup {
    return this.registerForm.get('passwords') as FormGroup;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = '';

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
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Registration failed. Try again';
      },
    });
  }
  // private authService = inject(AuthnService);
  // private router = inject(Router);
  // username = '';
  // email = '';
  // password = '';
  // confirmPass = '';
  // error = '';
  // tel = 0;
  // onRegister(): void {
  //   this.error = '';
  //   if (!this.username) {
  //     this.error = 'Username is required';
  //     return;
  //   }
  //   if (!this.email) {
  //     this.error = 'Email is required';
  //     return;
  //   }
  //   if (!this.password) {
  //     this.error = 'Password is required';
  //     return;
  //   }
  //   if (this.password !== this.confirmPass) {
  //     this.error = "Passwords don't match";
  //     return;
  //   }
  //   this.authService
  //     .register({
  //       username: this.username,
  //       email: this.email,
  //       password: this.password,
  //       tel: this.tel.toString(),
  //     })
  //     .subscribe({
  //       next: () => this.router.navigate(['/recipes']),
  //       error: (err) => {
  //         this.error = err.error?.message || 'Registration failed. Please try again.';
  //       },
  //     });
  // }
}
