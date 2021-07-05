import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Employees } from '../../../Interfaces/employees';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HrService } from 'src/app/Services/hr.service';



@Component({
  selector: 'app-hrtable',
  templateUrl: './hrtable.component.html',
  styleUrls: ['./hrtable.component.css']
})
export class HRTableComponent implements OnInit, OnDestroy {
  notify: Boolean = false;
  edit: Boolean = false;
  invite: Boolean = false;
  view: Boolean = false;
  reject: Boolean = false;
  current: String = "";
  dtOptions: DataTables.Settings = {};
  employees: Employees[] = [];
  notifyText:String="";
  dtTrigger: Subject<any> = new Subject<any>();
  reasonForm!: FormGroup;
  isSubmitted: Boolean = false;
  constructor(private httpClient: HttpClient,private fb: FormBuilder,private hr:HrService) { }

  ngOnInit(): void {
    this.reasonForm = this.fb.group(
      {
        reason: ["",
          [
            Validators.required
          ]
        ],
      })
      this.hr.listEmployees();
      this.hr.employees$.subscribe((data) => {
        console.log(data, typeof data, "httpdata");
        this.employees=data.data;
        console.log(this.employees);
      });
  }
  prevstateview(){
    this.reject=!this.reject;
    this.openview('Pending');
  }
  CloseNotification(closeEvent: Boolean) {
    this.notify = closeEvent;
    this.edit = closeEvent;
  }
  closeview(closedetails: Boolean) {
    this.view = closedetails;
  }
  rejectview(rejectreason: Boolean) {
    console.log(rejectreason);
    this.reject = rejectreason;
  }
  closefor(closereason: Boolean) {
    this.reject = closereason;
  }
  
  submitreason(): void {
    this.isSubmitted = true;
    console.log(this.reasonForm.valid, this.reasondata)
    if (this.reasonForm.valid) {
      let form =JSON.stringify(this.reasondata)
    let status=  this.hr.reasonforrejection(form);
    if(status===true)
      console.log("reason is submitted")
   this.reject=false;
    }
  }
  get reasondata() {
    return this.reasonForm.get("reason");
  }
closemodal(){
  this.reject=false;
}

  openview(status: String): void {
    this.current = status;
    this.view = !this.view
  }
  closeform(closeEvent: Boolean) {
    this.invite = closeEvent;
  }
  openform(): void {
    console.log(this.invite);
    this.invite = !this.invite
  }
  opennotification(): void {
    this.notifyText="User Notified Successfully"
    this.notify = !this.notify;
  }
  openedit(): void {
    this.notifyText="Edit access provided"
    this.edit = !this.edit;
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
