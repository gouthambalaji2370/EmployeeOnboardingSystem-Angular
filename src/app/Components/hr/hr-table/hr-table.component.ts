import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Employees } from '../../../Interfaces/employees';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HrService } from 'src/app/Services/hr.service';



@Component({
  selector: 'app-hrtable',
  templateUrl: './hr-table.component.html',
  styleUrls: ['./hr-table.component.css']
})
export class HRTableComponent implements OnInit, OnDestroy {
  notify: Boolean = false;
  edit: Boolean = false;
  invite: Boolean = false;
  view: Boolean = false;
  reject: Boolean = false;
  error:boolean=true;
  current!: Number;
  dtOptions: DataTables.Settings = {};
  employees: Employees[] = [];
  notifyText: String = "";
  dtTrigger: Subject<any> = new Subject<any>();
  reasonForm!: FormGroup;
  isSubmitted: Boolean = false;
  employee: any
  constructor(private httpClient: HttpClient, private fb: FormBuilder, private hr: HrService) { }

  ngOnInit(): void {

    this.RejectFormInitalize()
      this.getEmployeeData()
  }
  RejectFormInitalize():void{
    this.reasonForm = this.fb.group(
      {
        reason: ["",
          [
            Validators.required
          ]
        ],
      })
  }
  getEmployeeData():void{
    this.hr.getEmployees();
    this.hr.employees$.subscribe((data) => {
      console.log(data, typeof data, "httpdata");
      this.employees = data.data;
      this.dtTrigger.next();
      this.dtOptions = {
      }
      console.log(this.employees);
      if (this.employees.length > 0) {
        console.log('data loaded successfully');
      }
      else {
        this.notifyText = "Employee data loading failed";
        this.error=!this.error
        this.notify = !this.notify
      }
    });
  }
  backToViewModal() {
    this.reject = !this.reject;
    this.openViewModal(this.current);
  }
  CloseNotification(closeModalEvent: Boolean) {
    this.notify = closeModalEvent;
    this.edit = closeModalEvent;
  }
  closeViewModal(closedetails: Boolean) {
    this.view = closedetails;
  }
  rejectViewModal(rejectreason: Boolean) {
    console.log(rejectreason);
    this.reject = rejectreason;
  }
 

  submitReject(): void {
    this.isSubmitted = true;
    if (this.reasonForm.valid) {
      let form = JSON.stringify(this.reason?.value)
      let status = this.hr.rejectEmployeeData(form);
      if (status === true)
        this.reject = false;
    }
  }
  get reason() {
    return this.reasonForm.get("reason");
  }
  closeRejectModal() {
    this.reject = false;
  }

  openViewModal(status: Number): void {
    this.current = status;
    this.employees.forEach(data => {
      if (data.EmpId === this.current) {
        this.employee = data
      }
    })
    console.log(status);
    this.view = !this.view
  }
  closeInvite(closeInviteEvent: Boolean) {
    this.invite = closeInviteEvent;
  }
  openInvite(): void {
    console.log(this.invite);
    this.invite = !this.invite
  }
  openNotificationModal(type:boolean): void {
    if(type){
    this.notifyText = "User Notified Successfully"
    this.notify = !this.notify;
    }
    else{
      this.notifyText = "Edit access provided"
      this.edit = !this.edit;
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
