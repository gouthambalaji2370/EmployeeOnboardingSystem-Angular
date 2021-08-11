import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
// import * as bcrypt from 'bcryptjs';

// const salt = bcrypt.genSaltSync(10);
// var pass = bcrypt.hashSync("Lister@1234", salt);

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'Basic ' + btoa(`ListerAdmin:Lister@1234`),
//     'Accept':'*/*'
//   })
// };

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  public login$: Subject<any> = new Subject();
  constructor(private http: HttpClient) { }
  checkUser = (data: any) => {
    return  this.http.post("http://localhost:8080/login", data);
  };
  
}
