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
  basicDetails: Boolean = false;
  addressDetails: Boolean = false;
  approve:Boolean=false;
  status: String = "";
  notifyText: String = "";
  constructor() { }

  ngOnInit(): void {
    console.log(this.employeedetails.Status)
    status = this.employeedetails.Status
    console.log(typeof status)
  }
  closemodalapprove(): void {
    this.closedetails.emit(false);
    this.rejectreason.emit(false);
  }
  openBasicDetails() {
    this.basicDetails = !this.basicDetails;
    this.addressDetails = false;
  }
  openAddressDetails() {
    this.addressDetails = !this.addressDetails;
    this.basicDetails = false;

  }
  closemodal(): void {
    this.closedetails.emit(false);
    this.rejectreason.emit(false);
  }
  closemodalreject(): void {
    this.closedetails.emit(false);
    this.rejectreason.emit(true);
  }
}
