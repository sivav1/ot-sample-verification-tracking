import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {FormField} from '@angular/forms/signals';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormField,
    NgbDatepickerModule
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class FeatureModule { }
