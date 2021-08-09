import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {  
  public employee$: Subject<any> = new Subject();
  public response$: Subject<any> = new Subject();


  basicDetails: any;
  addressDetails: any;
  employeeDetails: any;

  baseurl="http://localhost:8080/";

  

  constructor(private http: HttpClient,public datepipe: DatePipe) { }
  datePipeImplementation(date:any){
    date=new Date();
    let latest_date =this.datepipe.transform(date, 'MM/dd/yyyy');
   }
  getEmployeeDetails() {
    var user=localStorage.getItem('id');
    this.http.get(this.baseurl+`formdata/${user}`).subscribe(data=>{
    this.employee$.next(data);
  })
    const addressDetails= [
      {
        area: "chepauk",
        country: "India",
        district: "chennai",
        flatName: "sfa",
        mapCoordinates: "12341.123N,123.12E",
        pincode: 600006,
        state: "Tamilnadu",
        street: "cnk",
        type: "permanent"
      },{
        area: "chepauk",
        country: "India",
        district: "chennai",
        flatName: "sfa",
        mapCoordinates: "12341.123N,123.12E",
        pincode: 600006,
        state: "Tamilnadu",
        street: "cnk",
        type: "present"
      }
     
    ]
  this.setAddressDetails(addressDetails);
}
  register(data:any){
    let address=[
      {
        "type":"present",
        "flatName":data.presentAddress.flatName,
         "area":data.presentAddress.area,
         "district":data.presentAddress.city,
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
         "district":data.permanentAddress.city,
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
      "action":"submit",
      "empID":localStorage.getItem('id'),
      "aadharNumber": this.basicDetails.aadharNumber,
      "bloodGroup": this.basicDetails.bloodGroup,
      "dob": this.datepipe.transform(this.basicDetails.dob, 'MM/dd/yyyy'),
      "emailID":  this.basicDetails.emailID,
      "emergencyContactName":  this.basicDetails.emergencyContactName,
      "emergencyContactNumber": this.basicDetails.emergencyContactNumber,
      "fatherName": this.basicDetails.fatherName,
      "firstName": this.basicDetails.firstName,
      "gender": this.basicDetails.gender,
      "hscScore": this.basicDetails.hsc,
      "lastName": this.basicDetails.lastName,
     "motherName": this.basicDetails.motherName,
      "phoneNumber": this.basicDetails.phoneNumber,
      "emergencyContactRelation": this.basicDetails.relation,
      "sslcScore": this.basicDetails.sslc,
      "ugScore": this.basicDetails.ug,
    "addresses":address
  };
   
    return this.http.post(this.baseurl+'employeedetails',this.employeeDetails)

  }
  save(data:any){
   
    let address=[
      {
        "type":"present",
        "flatName":data.presentAddress.flatName,
        "area":data.presentAddress.area,
        "district":data.presentAddress.city,
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
         "district":data.permanentAddress.city,
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
      "action":"save",
      "empID":localStorage.getItem('id'),
      "aadharNumber": this.basicDetails.aadharNumber,
      "bloodGroup": this.basicDetails.bloodGroup,
      "dob": this.datepipe.transform(this.basicDetails.dob, 'MM/dd/yyyy'),
      "emailID":  this.basicDetails.emailID,
      "emergencyContactName":  this.basicDetails.emergencyContactName,
      "emergencyContactNumber": this.basicDetails.emergencyContactNumber,
      "fatherName": this.basicDetails.fatherName,
      "firstName": this.basicDetails.firstName,
      "gender": this.basicDetails.gender,
      "hscScore": this.basicDetails.hsc,
      "lastName": this.basicDetails.lastName,
     "motherName": this.basicDetails.motherName,
      "phoneNumber": this.basicDetails.phoneNumber,
      "emergencyContactRelation": this.basicDetails.relation,
      "sslcScore": this.basicDetails.sslc,
      "ugScore": this.basicDetails.ug,
    "addresses":address
  };
  // console.log(this.employeeDetails)
   return this.http.post(this.baseurl+'employeedetails',this.employeeDetails)

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
