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
  imports: [ ReactiveFormsModule ],
  templateUrl: './register-panel.component.html',
  styleUrl: './register-panel.component.scss',
})
export class RegisterPanelComponent implements OnInit {
  constructor(private readonly authApiService: AuthApiService, private readonly router: Router, private readonly authService: AuthService ) {}

  ngOnInit(): void {
    this.authApiService
      .isUserAuthorized()
      .pipe(catchError((err) => of(err)))
      .subscribe((response) => {
        this.authService.goToHomePageIfUserIsAuthorized(response);
      });
  }

  error: string | null = null;

  registerFormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
  });

  loginUser(): void {
    var email = this.registerFormGroup.controls.email.value!;
    var password = this.registerFormGroup.controls.password.value!;
    var repeatedPassword = this.registerFormGroup.controls.repeatPassword.value!;

    this.error = null;

    if (password != repeatedPassword) {
      this.error = 'Hasła nie są takie same';
      return;
    }

    if (!this.isEmailCorrectFormat(email)) {
      this.error = 'Niepoprawny format emaila';
      return;
    }

    this.authApiService
      .registerUserWithEmailAndPassword(email, password)
      .pipe(catchError((err) => of(err)))
      .subscribe((response) => {
        this.checkForErrors(response);
      },
      );
  }

  private checkForErrors(data: any): void {
    if (data == null) {
      this.goToLoginPanel();
    }

    var errors = data.error.errors;

    if (errors.PasswordTooShort != null) {
      this.error = "Hasło musi mieć przynajmniej 8 znaków";
      return;
    }

    if (errors.PasswordRequiresDigit != null) {
      this.error = "Hasło musi mieć przynajmniej jedną cyfrę";
      return;
    }

    return;
  }

  private goToLoginPanel(): void {
    this.registerFormGroup.reset();
    this.router.navigateByUrl('login');
    alert("Zostałeś zarajestrowany, teraz się zaloguj");
  }

  private isEmailCorrectFormat(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
}
