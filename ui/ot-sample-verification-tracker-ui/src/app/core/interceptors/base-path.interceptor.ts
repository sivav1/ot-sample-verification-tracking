// base-path.interceptor.ts
import {HttpInterceptorFn} from '@angular/common/http';
import {ConfigService} from '../services/config.service';
import {inject} from '@angular/core';

export const basePathInterceptor: HttpInterceptorFn = (req, next) => {
  const configService = inject(ConfigService);

  console.log(JSON.stringify(req));
  // 1. Skip if it's the config file itself or an absolute URL
  if (req.url.includes('appsettings.json') || req.url.startsWith('http')) {

    return next(req);
  }

  const baseUrl = configService.apiBaseUrl;

  // 2. Only apply if baseUrl is actually available
  if (baseUrl) {
    const apiReq = req.clone({
      url: `${baseUrl}/${req.url}`.replace(/([^:]\/)\/+/g, '$1')
    });
    return next(apiReq);
  }

  return next(req);
};
