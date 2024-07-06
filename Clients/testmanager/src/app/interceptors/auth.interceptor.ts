import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const expires = localStorage.getItem('expires');

  if (accessToken && expires) {
    const expiresDate = new Date(expires);

    if (expiresDate > new Date()) {
      req = addAuthorizationHeader(req, accessToken);
    } else {
      return refreshToken().pipe(
        tap((response: any) => {
          localStorage.setItem('accessToken', response.accessToken);
          req = addAuthorizationHeader(req, response.accessToken);
          return next(req);
        }),
        catchError((error: any) => {
          console.error('Token refresh failed', error);
          return throwError(error);
        })
      );
    }
  }

  return next(req);
};

function addAuthorizationHeader(
  request: HttpRequest<any>,
  accessToken: string
): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function refreshToken(): Observable<any> {
  const refreshToken = localStorage.getItem('refreshToken');
  const http = inject(HttpClient);

  if (!refreshToken) {
    return throwError('No refresh token available');
  }

  const body = { refreshToken };
  const url = environment.apiUrl + '/refresh';

  return http.post<any>(url, body);
}
