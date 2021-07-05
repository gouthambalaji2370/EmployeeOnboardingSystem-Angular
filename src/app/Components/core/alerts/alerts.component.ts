import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modals',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class ModalsComponent implements OnInit {

  constructor() { }
  @Input()
  Content: String = "";
  // @Input()
  // open: Boolean = false;
  @Output()
  closeEvent = new EventEmitter<Boolean>();
  close: Boolean = false;

  ngOnInit(): void {
  }
  closemodal(): void {
    // this.open = !this.open
    this.closeEvent.emit(false);
  }
  closeout(): void {
    // this.open = false
    this.closeEvent.emit(false);
  }

}
