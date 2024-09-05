import {
  HttpClient,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.get('skipAuth')) {
    return next(req);
  }

  var accessToken = sessionStorage.getItem('accessToken');

  if (accessToken == null) {
    return next(req);
  }

  const expiresString = sessionStorage.getItem('expires');
  const expires = new Date(expiresString!);

  if (expires > new Date()) {
    return next(getRequestWithAuthHeader(req, accessToken));
  } else {
    const authService = inject(AuthService);

    refreshTokens().subscribe((response) => {
      if (response == null || response == undefined) {
        authService.signUserOut();
        return;
      }

      authService.saveTokens(response);

      const modReq = req.clone({
        setHeaders: { skipAuth: 'true' },
      });

      return next(getRequestWithAuthHeader(modReq, response.accessToken));
    });
  }

  return next(getRequestWithAuthHeader(req, accessToken));
};

function getRequestWithAuthHeader(
  request: HttpRequest<unknown>,
  accessToken: string
): HttpRequest<unknown> {
  const modReq = request.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` },
  });

  return modReq;
}

function refreshTokens(): Observable<any> {
  const http = inject(HttpClient);

  const apiUrl = environment.apiUrl + '/refresh';
  const refreshToken = sessionStorage.getItem('refreshToken');

  const body = {
    refreshToken: refreshToken,
  };

  return http.post<any>(apiUrl, body, { headers: { skipAuth: 'true' } });
}
