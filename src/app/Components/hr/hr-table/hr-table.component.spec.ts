import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { HeaderComponent } from '../../core/header/header.component';
import { InviteformComponent } from '../invite-form/invite-form.component';
import { UserdetailsviewComponent } from '../user-details-view/user-details-view.component';
import { HRTableComponent } from './hr-table.component';

describe('HrtableComponent', () => {
  let component: HRTableComponent;
  let fixture: ComponentFixture<HRTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,ReactiveFormsModule,RouterTestingModule,DataTablesModule],
      declarations: [ HRTableComponent ,HeaderComponent,UserdetailsviewComponent,InviteformComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRTableComponent);
    component = fixture.componentInstance;
    component.reject=true
    component.current=123
    component.employees= [{
    "EmpId":123,
    "Name":"Indraneel",
    "Email":"n@gmail.com",
    "Status":"Completed",
    "CreatedAt":"20-06-2021",
},{
    "EmpId":124,
    "Name":"Indraneel",
    "Email":"n@gmail.com",
    "Status":"Rejected",
    "CreatedAt":"20-06-2021",
   }];
 
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check reject form initalize',()=>{
    spyOn(component,'RejectFormInitalize');
    component.RejectFormInitalize();
    expect(component.RejectFormInitalize).toHaveBeenCalled()
  })
  it('should check get employee data',()=>{
    spyOn(component,'getEmployeeData');
    component.getEmployeeData(0);
    expect(component.getEmployeeData).toHaveBeenCalled()
  })

  it('should check open invite ',()=>{
    spyOn(component,'openInvite').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#openInvite');
    button.click();
    fixture.detectChanges();
    expect(component.openInvite).toHaveBeenCalled()
  })
  it('should employees data',()=>{
    expect('employees').toBeTruthy();
  })
  it('should check back to view modal',()=>{
    spyOn(component,'backToViewModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#redirectToView');
    button.click();
    fixture.detectChanges();
    expect(component.backToViewModal).toHaveBeenCalled()
  })
  it('should check submit reject form ',()=>{
    spyOn(component,'submitRejectForm').and.callThrough();
    component.reasonForm.controls['reason'].setValue('invalid map coordinates');
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#submitForm');
    button.click();
    expect(component.submitRejectForm).toHaveBeenCalled();
  })
  it('should check close reject modal',()=>{
    spyOn(component,'closeRejectModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#closeReject');
    button.click();
    fixture.detectChanges();
    expect(component.closeRejectModal).toHaveBeenCalled()
  })
  it('should check open view modal',()=>{
    spyOn(component,'openViewModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#viewDetails');
    button.click();
    fixture.detectChanges();
    expect(component.openViewModal).toHaveBeenCalledWith(123);
   
  })
  it('should check open notification modal ',()=>{
    spyOn(component,'openNotificationModal').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#notificationModal');
    button.click();
    fixture.detectChanges();
    expect(component.openNotificationModal).toHaveBeenCalledWith(true,123);
    
  })
 

});

