import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RegisterPage {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  registerForm = this.fb.group({
    fullname: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.isPosting()) return;
    this.isPosting.set(true);

    if (this.registerForm.invalid) {
      this.hasError.set(true);
      this.isPosting.set(false);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { fullname, email, password } = this.registerForm.value as {
      fullname: string | null;
      email: string | null;
      password: string | null;
    };

    this.authService
      .register(fullname ?? '', email ?? '', password ?? '')
      .subscribe((isRegistered) => {
        if (!isRegistered) {
          this.hasError.set(true);
          this.isPosting.set(false);
          setTimeout(() => this.hasError.set(false), 2000);
          return;
        }

        this.authService
          .login(email ?? '', password ?? '')
          .subscribe((isAuthenticated) => {
            this.isPosting.set(false);
            if (isAuthenticated) {
              this.router.navigateByUrl('/');
              return;
            }
          });

        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
      });
  }
}
