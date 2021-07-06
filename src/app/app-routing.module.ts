import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrModule } from './Components/hr/hr.module';
import { EmployeeModule } from './Components/employee/employee.module';
import { LoginModule } from './Components/login/login.module';
import { LoginformComponent } from './Components/login/login-form.component';
import { ErrorpageComponent } from './Components/core/error-page/error-page.component';
import { AuthguardService } from './Services/auth-guard.service';
import { RolebasedguardService } from './Services/role-based-guard.service';
import { HRTableComponent } from './Components/hr/hr-table/hr-table.component';
import { EmployeeformComponent } from './Components/employee/employee-form/employee-form.component';


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
