import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSampleComponent } from './add-product-sample.component';

describe('AddProductSampleComponent', () => {
  let component: AddProductSampleComponent;
  let fixture: ComponentFixture<AddProductSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductSampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductSampleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
