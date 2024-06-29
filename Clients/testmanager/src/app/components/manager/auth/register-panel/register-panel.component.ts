import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '../../../../services/auth/auth-api.service';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-register-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-panel.component.html',
  styleUrl: './register-panel.component.scss',
})
export class RegisterPanelComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  error: string | null = null;

  registerFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
  });

  registerUser(): void {
    var email = this.registerFormGroup.controls.email.value!;
    var password = this.registerFormGroup.controls.password.value!;
    var repeatedPassword =
      this.registerFormGroup.controls.repeatPassword.value!;

    this.error = null;

    if (password != repeatedPassword) {
      this.error = 'Hasła nie są takie same';
      return;
    }

    this.authService.registerUser(email, password).subscribe((response) => {
      if (response == null) {
        this.goToLoginPanel;
      }
    });
  }

  private goToLoginPanel(): void {
    this.router.navigateByUrl('login');
    alert('Zostałeś zarajestrowany, teraz się zaloguj');
  }
}
