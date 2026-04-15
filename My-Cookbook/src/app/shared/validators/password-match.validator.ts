import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPass = control.get('confirmPass');

  if (password?.value !== confirmPass?.value) {
    return { passwordsMismatch: true };
  }
  return null;
}
