import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  basicDetails: any;
  addressDetails: any;
  employeeDetails: any;

  baseurl="http://localhost:5000/";


  constructor(private http: HttpClient) { }
  getEmployeeDetails() {
    const data =  {
      basicDetails : {
        firstName: 'Devika',
      lastName: 'A',
      gender: 'female',
      name: 'Vino',
      relationShip: 'Uncle',
      phoneNumber: 1234567890,
    },
    addressDetails: {
     
    },
   
  };
  this.setBasicDetails(data.basicDetails);
  this.setAddressDetails(data.addressDetails);
}
  register(data:any){
    console.log(data);
    let formdata=this.basicDetails+this.addressDetails
    
    console.log(formdata);
    this.http.post(this.baseurl+'register',formdata).subscribe(res=>{
      console.log(res);
    })
    return true;

  }
  save(data:any){
    console.log(data);
    this.setAddressDetails(data)
    let formdata={
    "basicdetails":this.basicDetails,
    "addressDetails":this.addressDetails
  };
    console.log(formdata);
    this.http.post(this.baseurl+'save',formdata).subscribe(res=>{
      console.log(res);
    })
    return true;

  }
  setBasicDetails(details:any) {
    this.basicDetails = details;
  }
  getBasicDetails() {
    return this.basicDetails;
  }
  setAddressDetails(details:any) {
    this.addressDetails = details;
  }

  getAddressDetails() {
    return this.addressDetails;
  }
}
