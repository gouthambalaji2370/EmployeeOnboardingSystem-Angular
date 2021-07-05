import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseurl="http://localhost:5000/";

  constructor(private http: HttpClient) { }
  register(data:any){
    console.log(data);
    this.http.post(this.baseurl+'register',data).subscribe(res=>{
      console.log(res);
    })
    return true;

  }
  save(data:any){
    console.log(data);
    this.http.post(this.baseurl+'save',data).subscribe(res=>{
      console.log(res);
    })
    return true;

  }
}
