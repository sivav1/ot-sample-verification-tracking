import {Component, computed, signal} from '@angular/core';
import {
  defaultSample,
  ProductSampleFormModel,ProductSampleModel,
  ProductSampleSchema
} from '../../core/models/product-sample.model';
import {form, FormField, submit} from '@angular/forms/signals';
import {VerificationStatusEnum} from '../../enums/verification-status.enum';
import {NgbDate, NgbDateStruct, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {EnumRadioGroupComponent} from '../../shared/enum-radio-group.component/enum-radio-group.component';
import {firstValueFrom} from 'rxjs';
import {ProductSampleService} from '../../core/services/product-sample.service';

@Component({
  selector: 'app-add-product-sample',
  imports: [
    FormField,
    NgbInputDatepicker,
    EnumRadioGroupComponent
  ],
  templateUrl: './add-product-sample.component.html',
  styleUrl: './add-product-sample.component.css',
})
export class AddProductSampleComponent {

  constructor(public productSampleService: ProductSampleService) {
  }

  productSampleFormModel = signal<ProductSampleFormModel>(defaultSample)

  productSampleForm = form(this.productSampleFormModel, ProductSampleSchema);

  protected readonly statusOptions = Object.entries(VerificationStatusEnum)
    .filter(([_, val]) => typeof val === 'number')
    .map(([key, val]) => ({label: key, value: val as number}));
  protected readonly VerificationStatusEnum = VerificationStatusEnum;

   toNativeDate(ngbDate: NgbDateStruct | null | undefined): Date | null {
     console.log(JSON.stringify(ngbDate));
    // Check if the object exists AND has a valid year property
    if (!ngbDate || ngbDate.year === null || ngbDate.year === undefined) {
      return null;
    }

    // Note: month - 1 because JS Date months are 0-indexed (Jan = 0)
    return new Date(ngbDate.year, (ngbDate.month ?? 1) - 1, ngbDate.day ?? 1);
  }

  handleSubmit() {
    submit(this.productSampleForm, async () => {
      const productSampleModel: ProductSampleModel = {
        ...this.productSampleFormModel(),
        submittedOn: this.toNativeDate(this.productSampleFormModel().submittedOn)
      };
      await firstValueFrom(this.productSampleService.save(productSampleModel));
      this.productSampleForm().reset();
      this.productSampleFormModel.set({...defaultSample});
      this.productSampleService.refreshData();
    });
  }
}
