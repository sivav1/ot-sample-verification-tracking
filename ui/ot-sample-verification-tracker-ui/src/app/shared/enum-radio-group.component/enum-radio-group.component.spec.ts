import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumRadioGroupComponent } from './enum-radio-group.component';

describe('EnumRadioGroupComponent', () => {
  let component: EnumRadioGroupComponent;
  let fixture: ComponentFixture<EnumRadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnumRadioGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnumRadioGroupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
