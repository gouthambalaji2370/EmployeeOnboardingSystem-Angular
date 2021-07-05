import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login$: Subject<any> = new Subject();
  constructor(private http: HttpClient) { }
  checkuser = (data: any) => {
    console.log(data);
    return this.http.post("http://localhost:5000/login", data);
  };
  isLoggedIn =()=>{
    let value=false;
    if (localStorage.getItem('user')) {
      value=true;
  }
    else{
    value=false;
  }
  return value;
  }
  // checkValidUser(params: any) {
  //   console.log(params);
  //   return this.http.get('../../../assets/credentials.json').subscribe(data => {
  //     this.login$.next(data);
  //   });
  // }
}
