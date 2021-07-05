import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  public roles$: Subject<any> = new Subject();
  public employees$: Subject<any>=new Subject();

  baseurl="http://localhost:5000/";
  constructor(private http: HttpClient) { }
  listRoles(){
   return this.http.get("../../../../assets/roles.json").subscribe(data=>{
     console.log(data);
     this.roles$.next(data);
   })
    
  }
  listEmployees(){
    return this.http.get('../../../../assets/data.json').subscribe(data=>{
      console.log(data);
      this.employees$.next(data);
    })
  }
  createuser(data:any){
    console.log(data);
    this.http.post(this.baseurl+'createuser',data).subscribe(res=>{
      return res;
    })
    return true;
  }
  reasonforrejection(data:any){
    console.log(data);
    this.http.post(this.baseurl+'reject',data).subscribe(res=>{
      return res;
    })
    return true;
  }
  
}
