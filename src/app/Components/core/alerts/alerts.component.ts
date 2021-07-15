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
  @Output()
  closeEvent = new EventEmitter<Boolean>();
  close: Boolean = false;

  ngOnInit(): void {
  }
  closemodal(): void {
    this.closeEvent.emit(false);
  }
  closeout(): void {
    this.closeEvent.emit(false);
  }

}
