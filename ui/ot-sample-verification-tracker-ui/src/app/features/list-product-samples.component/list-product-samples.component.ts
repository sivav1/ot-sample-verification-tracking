import {Component, OnInit} from '@angular/core';
import {ProductSampleService} from '../../core/services/product-sample.service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {EnumValuePipe} from '../../shared/pipes/enum-value.pipe';
import {VerificationStatusEnum} from '../../enums/verification-status.enum';

@Component({
  selector: 'app-list-product-samples',
  imports: [
    AsyncPipe,
    DatePipe,
    EnumValuePipe
  ],
  templateUrl: './list-product-samples.component.html',
  styleUrl: './list-product-samples.component.css',
})
export class ListProductSamplesComponent implements OnInit {
    constructor(public productSampleService: ProductSampleService) {
    }

    ngOnInit() {
      this.productSampleService.refreshData();
    }

  protected readonly VerificationStatusEnum = VerificationStatusEnum;
}
