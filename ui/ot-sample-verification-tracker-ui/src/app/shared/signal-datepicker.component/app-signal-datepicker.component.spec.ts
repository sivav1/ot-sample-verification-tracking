import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSignalDatepickerComponent } from './signal-datepicker.component';

describe('AppSignalDatepickerComponent', () => {
  let component: AppSignalDatepickerComponent;
  let fixture: ComponentFixture<AppSignalDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSignalDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSignalDatepickerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
