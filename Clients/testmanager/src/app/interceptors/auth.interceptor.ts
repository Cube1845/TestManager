import {
  HttpClient,
  HttpInterceptorFn,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl: string = 'https://localhost:7037';
  const accessToken = localStorage.getItem('accessToken');
  const url = environment.apiUrl;
  const authService = inject(AuthService);
  const http = inject(HttpClient);

  if (accessToken != null) {
    var expires = localStorage.getItem('expires')!;
    var expireDate = new Date(expires);
    var now = new Date();

    if (expireDate < now) {
      var refreshToken = localStorage.getItem('refreshToken')!;

      const refreshReq = req.clone({
        url: url + '/refresh',
        params: new HttpParams().set('refreshToken', refreshToken),
      });

      next(refreshReq).pipe(
        tap((response) => {
          authService.saveTokens(response);
          const accessToken = localStorage.getItem('accessToken');

          const modReq = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + accessToken,
            },
          });

          return next(modReq);
        })
      );
    }

    const modReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    return next(modReq);
  }

  return next(req);
};
