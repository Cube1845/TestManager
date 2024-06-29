import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var accessToken = localStorage.getItem('accessToken');

  if (accessToken != null) {
    const modReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    return next(modReq);
  }

  return next(req);
};
