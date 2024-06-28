import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly router: Router) { }

  returnToLoginIfUserIsNotAuthorized(requestResponse: any): void {
    if (requestResponse != true) {
      this.router.navigateByUrl('login');
    }
  }

  goToHomePageIfUserIsAuthorized(requestResponse: any): void {
    if (requestResponse == true) {
      this.router.navigateByUrl('home');
    }
  }

  signUserOut(): void {
    localStorage.clear();
  }
}
