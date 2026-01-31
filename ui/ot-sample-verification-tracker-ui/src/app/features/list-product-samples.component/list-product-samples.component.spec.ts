import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductSamplesComponent } from './list-product-samples.component';

describe('ListProductSamplesComponent', () => {
  let component: ListProductSamplesComponent;
  let fixture: ComponentFixture<ListProductSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductSamplesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductSamplesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
