import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDto } from '../../models/DTOs/auth/authDto';
import { AuthApiService } from './auth-api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly router: Router,
    private readonly authApiService: AuthApiService
  ) {}

  loginUser(email: string, password: string): Observable<any> {
    const authDto: AuthDto = {
      email: email,
      password: password,
    };

    return this.authApiService
      .loginUser(authDto)
      .pipe(tap((response) => this.saveTokens(response)));
  }

  registerUser(email: string, password: string): Observable<void> {
    const authDto: AuthDto = {
      email: email,
      password: password,
    };

    return this.authApiService.registerUser(authDto);
  }

  saveTokens(data: any): void {
    var accessToken = data.accessToken;
    var refreshToken = data.refreshToken;

    let currentDate = new Date();
    let currentTimeInMilliseconds = currentDate.getTime();
    let secondsToAdd = 20; //data.expiresIn;
    let updatedTimeInMilliseconds =
      currentTimeInMilliseconds + secondsToAdd * 1000;
    let expires = new Date(updatedTimeInMilliseconds);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expires', expires.toISOString());
  }

  signUserOut(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('accessToken')!;
    return !!accessToken;
  }
}
