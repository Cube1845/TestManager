import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDto } from '../../models/DTOs/auth/authDto';
import { AuthApiService } from './auth-api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly authApiService: AuthApiService) {}

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
    let secondsToAdd = data.expiresIn;
    let updatedTimeInMilliseconds =
      currentTimeInMilliseconds + secondsToAdd * 1000;
    let expires = new Date(updatedTimeInMilliseconds);

    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('expires', expires.toISOString());
  }

  signUserOut(): void {
    sessionStorage.clear();
  }

  isLoggedIn(): boolean {
    const accessToken = sessionStorage.getItem('accessToken')!;
    return !!accessToken;
  }
}
