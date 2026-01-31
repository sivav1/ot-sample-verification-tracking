import {ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {errorInterceptor} from './core/interceptors/error.interceptor-interceptor';
import {basePathInterceptor} from './core/interceptors/base-path.interceptor';
import {ConfigService} from './core/services/config.service';
import {correlationIdInterceptor} from './core/interceptors/correlation-id-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, basePathInterceptor, correlationIdInterceptor])),
    provideAppInitializer(() => {
      const configService = inject(ConfigService);
      return configService.loadConfig();
    }),
  ]
};
