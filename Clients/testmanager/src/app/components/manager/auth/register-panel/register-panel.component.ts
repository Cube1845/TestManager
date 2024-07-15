import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '../../../../services/auth/auth-api.service';
import { catchError, map, of } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { ToasterService } from '../../../../services/toaster/toaster.service';

@Component({
  selector: 'app-register-panel',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-panel.component.html',
  styleUrl: './register-panel.component.scss',
})
export class RegisterPanelComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toasterService: ToasterService
  ) {}

  registerFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  registerUser(): void {
    var email = this.registerFormGroup.controls.email.value!;
    var password = this.registerFormGroup.controls.password.value!;
    var repeatedPassword =
      this.registerFormGroup.controls.repeatPassword.value!;

    if (password != repeatedPassword) {
      this.toasterService.displayError('Hasła nie są takie same');
      return;
    }

    this.authService.registerUser(email, password).subscribe((response) => {
      if (response == null) {
        this.goToLoginPanel();
      }
    });
  }

  private goToLoginPanel(): void {
    this.router.navigateByUrl('login');
    this.toasterService.displaySuccess(
      'Zostałeś zarejestrowany, teraz się zaloguj',
      6000
    );
  }
}
