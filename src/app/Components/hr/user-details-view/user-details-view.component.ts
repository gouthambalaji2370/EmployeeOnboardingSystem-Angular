import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-userdetailsview',
  templateUrl: './user-details-view.component.html',
  styleUrls: ['./user-details-view.component.css']
})
export class UserdetailsviewComponent implements OnInit {

  @Input()
  employeedetails: any;
  @Output()
  closedetails = new EventEmitter<Boolean>();
  @Output()
  rejectreason = new EventEmitter<Boolean>();
  basicDetails: Boolean = true;
  addressDetails: Boolean = false;
  approve:Boolean=false;
  status: String = "";
  notifyText: String = "";
  constructor() { }

  ngOnInit(): void {
    status = this.employeedetails.Status
  }
  closemodalapprove(userid:String): void {
    this.closedetails.emit(false);
    this.rejectreason.emit(false);
  }
  openDetails(type:String) {
    if(type==="Basic"){
    this.addressDetails = false
    this.basicDetails = true;
  }
  else{
    this.addressDetails = true
    this.basicDetails = false;
  }

  }
  closeNotificationModal(type:Boolean): void {
    if(type){
      this.closedetails.emit(false);
      this.rejectreason.emit(true);
    }
    else{
      this.closedetails.emit(false);
      this.rejectreason.emit(false);
    }
   
  }
}
