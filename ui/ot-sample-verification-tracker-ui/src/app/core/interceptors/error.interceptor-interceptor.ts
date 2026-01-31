// error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`Error ${error.status}: ${error.message}`);

      if (error.status === 500) {
        alert('Server is down! Please try again later.');
      }

      return throwError(() => error);
    })
  );
};
