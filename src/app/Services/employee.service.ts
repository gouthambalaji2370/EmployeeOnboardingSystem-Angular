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
    let address=[
      {
        "type":"present",
        "flatName":data.presentAddress.flatName,
         "area":data.presentAddress.area,
         "city":data.presentAddress.city,
         "country":data.presentAddress.country,
         "state":data.presentAddress.state,
         "street":data.presentAddress.streetName,
         "pincode":data.presentAddress.pinCode,
         "mapCoordinates":data.presentAddress.mapCoordinates
      },
      {
        "type":"permanent",
        "flatName":data.permanentAddress.flatName,
         "area":data.permanentAddress.area,
         "city":data.permanentAddresscity,
         "country":data.permanentAddress.country,
         "state":data.permanentAddress.state,
         "street":data.permanentAddress.streetName,
         "pincode":data.permanentAddress.pinCode,
         "mapCoordinates":data.permanentAddress.mapCoordinates
       
      }
    ]
    console.log(address)
    this.setAddressDetails(address)
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
   
    let address=[
      {
        "type":"present",
        "flatName":data.presentAddress.flatName,
         "area":data.presentAddress.area,
         "city":data.presentAddress.city,
         "country":data.presentAddress.country,
         "state":data.presentAddress.state,
         "street":data.presentAddress.streetName,
         "pincode":data.presentAddress.pinCode,
         "mapCoordinates":data.presentAddress.mapCoordinates
      },
      {
        "type":"permanent",
        "flatName":data.permanentAddress.flatName,
         "area":data.permanentAddress.area,
         "city":data.permanentAddresscity,
         "country":data.permanentAddress.country,
         "state":data.permanentAddress.state,
         "street":data.permanentAddress.streetName,
         "pincode":data.permanentAddress.pinCode,
         "mapCoordinates":data.permanentAddress.mapCoordinates
       
      }
    ]
    console.log(address)
    this.setAddressDetails(address)
    this.employeeDetails={
      "aadharNumber": this.basicDetails.aadharNumber,
      "bloodGroup": this.basicDetails.bloodGroup,
      "dob": this.basicDetails.dob,
      "emailID":  this.basicDetails.emailID,
      "emergencyContactName":  this.basicDetails.emergencyContactName,
      "emergencyContactNumber": this.basicDetails.emergencyContactNumber,
      "fatherName": this.basicDetails.fatherName,
      "firstName": this.basicDetails.firstName,
      "gender": this.basicDetails.gender,
      "hsc": this.basicDetails.hsc,
      "lastName": this.basicDetails.lastName,
     "motherName": this.basicDetails.motherName,
      "phoneNumber": this.basicDetails.phoneNumber,
      "emergencyContactRelation": this.basicDetails.relation,
      "sslc": this.basicDetails.sslc,
      "ug": this.basicDetails.ug,
    "addressDetails":this.addressDetails
  };
  console.log(this.employeeDetails)
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
