import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EnumValuePipe} from './pipes/enum-value.pipe';
import {EnumRadioGroupComponent} from './enum-radio-group.component/enum-radio-group.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EnumValuePipe,
    EnumRadioGroupComponent
  ],
  exports: [EnumValuePipe, EnumRadioGroupComponent]
})
export class SharedModule { }
