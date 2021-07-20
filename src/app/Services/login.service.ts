import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login$: Subject<any> = new Subject();
  constructor(private http: HttpClient) { }
  checkUser = (data: any) => {
  let res;
    if(data.email==="hr@gmail.com"){
      res=({success:true,role:'HR'})
    }
    else{
      res=({success:true,role:'Employee'})
    }
    return of( res);
    // return this.http.post("http://localhost:5000/login", data);
  };
  
}
