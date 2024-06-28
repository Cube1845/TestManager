import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../services/auth/auth-api.service';
import { NgStyle } from '@angular/common';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login-panel',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.scss'
})
export class LoginPanelComponent implements OnInit {
  constructor(private readonly authApiService: AuthApiService, private readonly router: Router, private readonly authService: AuthService) {}
  
  ngOnInit(): void {
    this.authApiService
      .isUserAuthorized()
      .pipe(catchError((err) => of(err)))
      .subscribe((response) => {
        this.authService.goToHomePageIfUserIsAuthorized(response);
      });
  }

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

    this.authApiService
      .loginUserWithEmailAndPassword(email, password)
      .pipe(catchError(err => of(err)))
      .subscribe(response => {
        this.checkForErrors(response);
      });
  }

  checkForErrors(data: any): void {
    if (data.accessToken != null) {
      this.saveTokens(data);
      this.goToHomePage();
      return;
    }

    if (data.status == 401) {
      this.error = "Nieprawidłowy email lub hasło";
      return;
    } 
    
    this.error = "Brak połączenia z internetem";
  }

  private saveTokens(data: any): void {
    var accessToken = data.accessToken;
    var refreshToken = data.refreshToken;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  private goToHomePage(): void {
    this.loginFormGroup.reset();
    this.router.navigateByUrl('home');
  }

  private isEmailCorrectFormat(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
}
