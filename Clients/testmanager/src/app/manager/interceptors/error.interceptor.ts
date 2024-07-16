import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster/toaster.service';
import { isResult } from '../models/types/result';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toaster = inject(ToasterService);

  return next(req).pipe(
    catchError((err) => of(err)),
    map((response) => {
      if (req.headers.get('skipAuth')) {
        return response;
      }

      if (response instanceof HttpErrorResponse) {
        if (response.status == 401) {
          toaster.displayError('Niepoprawny email lub hasło');
          return null;
        }

        if (
          response.status == 400 &&
          response.error.title == 'One or more validation errors occurred.'
        ) {
          if (response.error.errors['PasswordRequiresDigit'] != null) {
            toaster.displayError('Hasło musi mieć przynajmniej jedną cyfrę');
            return response;
          }

          if (response.error.errors['DuplicateUserName'] != null) {
            toaster.displayError('Ten email jest już zajęty');
            return response;
          }
        }
      }

      var key: string = 'body';

      if (response instanceof HttpErrorResponse) {
        key = 'error';
      }

      const body = response[key];

      if (isResult(body)) {
        if (!body.isSuccess) {
          toaster.displayError(body.message!);
          return null;
        }

        if (!!body.message) {
          toaster.displaySuccess(body.message);
        }

        return response.clone({ body: body.value });
      }

      return response;
    })
  );
};
