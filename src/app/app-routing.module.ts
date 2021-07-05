import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrModule } from './Components/hr/hr.module';
import { EmployeeModule } from './Components/employee/employee.module';
import { LoginModule } from './Components/login/login.module';
import { LoginformComponent } from './Components/login/loginform/loginform.component';
import { ErrorpageComponent } from './Components/core/errorpage/errorpage.component';
import { AuthguardService } from './Services/authguard.service';
import { RolebasedguardService } from './Services/rolebasedguard.service';
import { HRTableComponent } from './Components/hr/hrtable/hrtable.component';
import { EmployeeformComponent } from './Components/employee/employeeform/employeeform.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login',  component: LoginformComponent },
  { path: 'employee', component:EmployeeformComponent,canActivate:[AuthguardService,RolebasedguardService],data: {roles: ['Employee']}},
  { path: 'hr',component:HRTableComponent,canActivate:[AuthguardService,RolebasedguardService],data: {roles: ['HR']}},
  {path:'**', component:ErrorpageComponent},
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
