import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '../../../../services/auth/auth-api.service';
import { NgStyle } from '@angular/common';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.scss',
})
export class LoginPanelComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  error: string | null = null;

  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  loginUser(): void {
    var email = this.loginFormGroup.controls.email.value!;
    var password = this.loginFormGroup.controls.password.value!;

    this.error = null;

    this.authService.loginUser(email, password).subscribe((response) => {
      this.router.navigateByUrl('home');
    });
  }
}
