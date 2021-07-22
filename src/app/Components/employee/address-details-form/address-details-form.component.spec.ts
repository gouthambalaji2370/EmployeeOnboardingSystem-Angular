import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressDetailsFormComponent } from './address-details-form.component';

describe('AddressDetailsFormComponent', () => {
  let component: AddressDetailsFormComponent;
  let fixture: ComponentFixture<AddressDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule,HttpClientTestingModule],
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
