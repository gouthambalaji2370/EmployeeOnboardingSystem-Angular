import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrModule } from './Components/hr/hr.module';
import { EmployeeModule } from './Components/employee/employee.module';
import { LoginModule } from './Components/login/login.module';
import { HRTableComponent } from './Components/hr/hrtable/hrtable.component';
import { LoginformComponent } from './Components/login/loginform/loginform.component';
import { EmployeeformComponent } from './Components/employee/employeeform/employeeform.component';


const routes: Routes = [
   {path:'',component:LoginformComponent},
  {path:'employee',component:EmployeeformComponent},
  {path:'hr',component:HRTableComponent}
];

@NgModule({

  imports: [
    HrModule,
    LoginModule,
    EmployeeModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
