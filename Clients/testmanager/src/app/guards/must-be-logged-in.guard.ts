import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const mustBeLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const loggedIn = authService.isLoggedIn();

  if (!loggedIn) {
    router.navigateByUrl('login');
  }

  return loggedIn;
};
