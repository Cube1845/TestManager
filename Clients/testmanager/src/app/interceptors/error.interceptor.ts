import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => of(err)),
    tap((response) => {
      if (
        response instanceof HttpErrorResponse &&
        req.headers.get('skipAuth') == null
      ) {
        if (response.status == 401) {
          authService.signUserOut();
          router.navigateByUrl('login');
        }
      }
    })
  );
};
