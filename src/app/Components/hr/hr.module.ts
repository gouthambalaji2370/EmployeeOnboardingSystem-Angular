import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HRTableComponent } from './hrtable/hrtable.component';
import { CoreModule } from '../core/core.module';
import { DataTablesModule } from 'angular-datatables';
import { InviteformComponent } from './inviteform/inviteform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserdetailsviewComponent } from './userdetailsview/userdetailsview.component';
import { RejectreasonComponent } from './rejectreason/rejectreason.component';

const routes: Routes = [
  { path: '', component: HRTableComponent }
];

@NgModule({
  declarations: [
    HRTableComponent,
    InviteformComponent,
    UserdetailsviewComponent,
    RejectreasonComponent
  ],
  imports: [
    CommonModule, CoreModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HrModule { }
