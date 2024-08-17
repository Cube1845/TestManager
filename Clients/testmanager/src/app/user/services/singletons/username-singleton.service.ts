import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsernameSingletonService {
  setUsername(username: string | null): void {
    sessionStorage.setItem('username', JSON.stringify(username));
  }

  getUsername(): string | null {
    const username = sessionStorage.getItem('username');

    if (username == null || username == '') {
      return null;
    }

    return username;
  }
}
