import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
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
        firstName: 'ada',
      lastName: 'aba',
      gender: 'female',
      name: 'adf',
      relationship: 'Uncle',
      phoneNumber: 1234567890,
    },
    addressDetails: {
     
    },
   
  };
  this.setBasicDetails(data.basicDetails);
  this.setAddressDetails(data.addressDetails);
}
  register(data:any){
    this.setAddressDetails(data)
    this.employeeDetails={
    "basicdetails":this.basicDetails,
    "addressDetails":this.addressDetails
  };
   // this.http.post(this.baseurl+'register',this.employeeDetails).subscribe(res=>{
    //   return res;
    // })
    return of ({success:true});

  }
  save(data:any){
    this.setAddressDetails(data)
    this.employeeDetails={
    "basicdetails":this.basicDetails,
    "addressDetails":this.addressDetails
  };
   // this.http.post(this.baseurl+'savedetails',this.employeeDetails).subscribe(res=>{
    //   return res;
    // })
    return ({success:true});

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
