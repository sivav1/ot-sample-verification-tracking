import {APP_INITIALIZER, inject, NgModule, Optional, provideAppInitializer, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {errorInterceptor} from './interceptors/error.interceptor-interceptor';
import {ProductSampleService} from './services/product-sample.service';
import {correlationIdInterceptor} from './interceptors/correlation-id-interceptor';
import {ConfigService} from './services/config.service';
import {basePathInterceptor} from './interceptors/base-path.interceptor';

@NgModule({
  imports:[],
  providers: [

  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
