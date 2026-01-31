import {inject, NgModule, provideAppInitializer} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {FeatureModule} from './features/feature-module';
import {BrowserModule} from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {basePathInterceptor} from './core/interceptors/base-path.interceptor';
import {ConfigService} from './core/services/config.service';
import {App} from './app';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CommonModule,
    SharedModule,
    FeatureModule,
  ],
})
export class AppModule { }
