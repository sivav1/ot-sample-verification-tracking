import {inject, NgModule, provideAppInitializer} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {FeatureModule} from './features/feature-module';
import {BrowserModule} from '@angular/platform-browser';
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        CoreModule,
        CommonModule,
        SharedModule,
        FeatureModule,
        NgbToastModule
    ],
})
export class AppModule {
}
