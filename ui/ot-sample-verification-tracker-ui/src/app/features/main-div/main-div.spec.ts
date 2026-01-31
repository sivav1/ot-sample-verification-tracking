import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDiv } from './main-div';

describe('MainDiv', () => {
  let component: MainDiv;
  let fixture: ComponentFixture<MainDiv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDiv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDiv);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
