import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login$:Subject<any> = new Subject();
  constructor(private http: HttpClient) { }
  //observable
  checkuser = ( data:any) => {
    console.log(data);
    return this.http.post("http://localhost:5000/login",data);
  };
  //subject 
  checkValidUser(params:any) {
    console.log(params);
    return this.http.get('../../../assets/credentials.json').subscribe(data =>{
      this.login$.next(data); // same data
    });
 }
}
