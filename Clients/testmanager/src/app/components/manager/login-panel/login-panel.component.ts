import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../services/auth/auth-api.service';

@Component({
  selector: 'app-login-panel',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.scss'
})
export class LoginPanelComponent {
  constructor(private readonly authApiService: AuthApiService) {}

  error: string | null = null;

  loginFormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  loginUser(): void {
    var email = this.loginFormGroup.controls.email.value!;
    var password = this.loginFormGroup.controls.password.value!;

    this.error = null;
    if (!this.isEmailCorrectFormat(email)) {
      this.error = "Niepoprawny format emaila";
      return;
    }

    this.authApiService.loginUserWithEmailAndPassword(email, password);
  }

  private isEmailCorrectFormat(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
}
