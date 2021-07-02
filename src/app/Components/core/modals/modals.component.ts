import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {

  constructor() { }
@Input()
Content:String="";
@Input()
open:Boolean=false;
@Output()
newItemEvent = new EventEmitter<Boolean>();
close:Boolean=false;

  ngOnInit(): void {
  }
closemodal():void{
  this.open=!this.open
  this.newItemEvent.emit(false);
}
closeout():void{
  this.open=false
  this.newItemEvent.emit(false);
}

}
