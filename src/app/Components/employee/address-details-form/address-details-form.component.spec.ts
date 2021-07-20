import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDetailsFormComponent } from './address-details-form.component';

describe('AddressDetailsFormComponent', () => {
  let component: AddressDetailsFormComponent;
  let fixture: ComponentFixture<AddressDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
