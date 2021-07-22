import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../core/header/header.component';
import { AddressDetailsFormComponent } from '../address-details-form/address-details-form.component';

import { BasicDetailsFormComponent } from './basic-details-form.component';

describe('BasicDetailsFormComponent', () => {
  let component: BasicDetailsFormComponent;
  let fixture: ComponentFixture<BasicDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockLocationStrategy],
      imports:[ ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule],
      declarations: [ BasicDetailsFormComponent ,AddressDetailsFormComponent,HeaderComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const firstNameInput = compiled.querySelector('input[name="firstName"]');
    const lastNameInput = compiled.querySelector('input[name="lname"]');

    expect(lastNameInput).toBeTruthy();
    expect(firstNameInput).toBeTruthy();
  });
});
