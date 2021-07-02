import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Country, State, City }  from 'country-state-city';
import { Subject } from 'rxjs';
import { Employees } from '../employees';

// import data from '../data.json';
// console.log(Country.getAllCountries())
// console.log(State.getAllStates())

@Component({
  selector: 'app-hrtable',
  templateUrl: './hrtable.component.html',
  styleUrls: ['./hrtable.component.css']
})
export class HRTableComponent implements OnInit,OnDestroy {
  notify:Boolean=false;
  edit:Boolean=false;
  invite:Boolean=false;
  view:Boolean=false;
  reject:Boolean=false;
  current:String="";
  dtOptions: DataTables.Settings = {};
  employees: Employees[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Employees[]>("../../../../assets/data.json")
      .subscribe(data => {
        console.log(data);
        this.employees = (data as any).data;
        this.dtTrigger.next();
      });
  }
  addItem(newItem: Boolean) {
   this.notify=newItem;
   this.edit=newItem;
  }
  closeview(closedetails:Boolean){
this.view=closedetails;
  }
  rejectview(rejectreason:Boolean){
    console.log(rejectreason);
    this.reject=rejectreason;
  }
  closefor(closereason:Boolean){
    this.reject=closereason;
  }
  openview(status:String):void{
    this.current=status;
    this.view=!this.view
  }
  closeform(closeEvent:Boolean){
  this.invite=closeEvent;
  }
  openform():void{
    this.invite=!this.invite
  }
  opennotification():void{
    this.notify=!this.notify;
  }
  openedit():void{
    this.edit=!this.edit;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
