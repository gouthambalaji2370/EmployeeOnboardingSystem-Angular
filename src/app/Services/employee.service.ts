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
    this.setAddressDetails(data)
    this.employeeDetails={
    "basicdetails":this.basicDetails,
    "addressDetails":this.addressDetails
  };
    console.log(this.employeeDetails);;
    return of ({success:true});

  }
  save(data:any){
    console.log(data);
    this.setAddressDetails(data)
    this.employeeDetails={
    "basicdetails":this.basicDetails,
    "addressDetails":this.addressDetails
  };
    console.log(this.employeeDetails);
    return ({success:true});

  }
  setBasicDetails(details:any) {
    this.basicDetails = details;
    console.log(this.basicDetails);
    
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
