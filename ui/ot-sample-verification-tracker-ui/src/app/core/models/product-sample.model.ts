import {VerificationStatusEnum} from '../../enums/verification-status.enum';
import {minLength, required, schema, validate} from '@angular/forms/signals';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export interface ProductSampleModel {
  productId: string;
  productName: string;
  origin: string;
  verificationStatus: VerificationStatusEnum | null;
  submittedOn: Date | null;
  notes: string;
}

export interface ProductSampleFormModel {
  productId: string;
  productName: string;
  origin: string;
  verificationStatus: VerificationStatusEnum | null;
  submittedOn: NgbDateStruct | null;
  notes: string;
}

export const defaultSample: ProductSampleFormModel = {
  notes: '',
  origin: '',
  productId: '',
  productName: '',
  submittedOn: null,
  verificationStatus: null,
};

export const ProductSampleSchema = schema<ProductSampleFormModel>((psm) => {
  required(psm.productName, {
    message: 'Product name is required',
  });
  minLength(psm.productName, 3);
  required(psm.submittedOn);
  required(psm.verificationStatus,{
    message: 'Verification status is required',
  });
  required(psm.submittedOn, {
    message: 'Verification date is required',
  });
  validate(psm.submittedOn, ({ value }) => {
    if (value()) {
        // @ts-ignore
      const newDate = new Date(value().year, value().month-1, value().day);

      if(newDate > new Date()) {
          return {kind: 'future', message: 'Date cannot be in the future'};
        }

    }
    else {
      return {kind: 'value', message: 'Date cannot be null'};
    }
    return null;
  });
})
