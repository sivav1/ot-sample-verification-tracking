import { HttpInterceptorFn } from '@angular/common/http';

export const correlationIdInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationId = crypto.randomUUID();

  const reqWithHeader = req.clone({
    setHeaders: {
      'X-Correlation-ID': correlationId
    }
  });

  return next(reqWithHeader);
};
