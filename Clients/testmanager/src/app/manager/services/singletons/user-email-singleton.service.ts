import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserEmailSingletonService {
  getUserEmail(): string | null {
    return sessionStorage.getItem('userEmail');
  }

  setUserEmail(email: string | null): void {
    if (email == null) {
      sessionStorage.removeItem('userEmail');
      return;
    }

    sessionStorage.setItem('userEmail', email);
  }
}
