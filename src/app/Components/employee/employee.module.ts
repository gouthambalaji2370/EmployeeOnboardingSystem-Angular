import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeformComponent } from './employee-form/employee-form.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form/address-form.component';
import { BasicDetailsFormComponent } from './basic-details-form/basic-details-form.component';


@NgModule({
  declarations: [
    EmployeeformComponent,
    AddressFormComponent,
    BasicDetailsFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
