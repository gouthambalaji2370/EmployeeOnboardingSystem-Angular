import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  public roles$: Subject<any> = new Subject();
  public employees$: Subject<any>=new Subject();

  baseurl="http://localhost:5000/";
  constructor(private http: HttpClient) { }
  getRoles(){
   return this.http.get("/../../../../assets/roles.json").subscribe(data=>{
     this.roles$.next(data);
   })
    
  }
  
  getEmployees(){
    return this.http.get('../../../../assets/data.json').subscribe(data=>{
      this.employees$.next(data);
    })
  }
  createEmployee(data:any){
    // this.http.post(this.baseurl+'createuser',data).subscribe(res=>{
    //   return res;
    // })
    return of ({success:true});
  }
  rejectEmployeeData(data:any){
    // this.http.post(this.baseurl+'reject',data).subscribe(res=>{
    //   return res;
    // })
    return of ({success:true});
  }
  
}
