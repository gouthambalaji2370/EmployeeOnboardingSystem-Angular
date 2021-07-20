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
  @Input()
  type:Boolean=true
  @Output()
  closeModalEvent = new EventEmitter<Boolean>();
  close: Boolean = false;

  ngOnInit(): void {
  }
  closemodal(): void {
    this.closeModalEvent.emit(false);
  }

}
