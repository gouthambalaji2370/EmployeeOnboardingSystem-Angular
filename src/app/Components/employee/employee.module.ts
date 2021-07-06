import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeformComponent } from './employee-form/employee-form.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeformComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
