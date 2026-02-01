// error.interceptor.ts
import {HttpInterceptorFn, HttpErrorResponse} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from "@angular/core";
import {ToasterService} from "../services/toaster.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toasterService = inject(ToasterService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error(toasterService)
            console.error(`Error ${error.status}: ${error.message}`);

            if (error.status === 500) {
                alert('Server is down! Please try again later.');
            }

            toasterService.showError(`API Error: ${error.message}`);

            return throwError(() => error);
        })
    );
};
