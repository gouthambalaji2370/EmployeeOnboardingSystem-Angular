import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-userdetailsview',
  templateUrl: './user-details-view.component.html',
  styleUrls: ['./user-details-view.component.css']
})
export class UserdetailsviewComponent implements OnInit {
  // @Input()
  // open: Boolean = false;
  @Input()
  status: String = "";
  @Output()
  closedetails = new EventEmitter<Boolean>();
  @Output()
  rejectreason = new EventEmitter<Boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  closemodalapprove(): void {
    // this.open = !this.open
    this.closedetails.emit(false);
    this.rejectreason.emit(false);
  }
  closemodal(): void {
    // this.open = !this.open
    this.closedetails.emit(false);
    this.rejectreason.emit(false);
  }
  closemodalreject(): void {
    // this.open = !this.open
    this.closedetails.emit(false);
    this.rejectreason.emit(true);
  }
}
