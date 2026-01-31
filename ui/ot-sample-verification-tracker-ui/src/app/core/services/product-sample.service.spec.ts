import { TestBed } from '@angular/core/testing';

import { ProductSampleService } from './product-sample.service';

describe('ProductSampleService', () => {
  let service: ProductSampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
