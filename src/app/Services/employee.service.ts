import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {  
  public employee$: Subject<any> = new Subject();
  public response$: Subject<any> = new Subject();


  basicDetails: any;
  addressDetails: any;
  employeeDetails: any;

  baseurl="http://localhost:8080/";

  

  constructor(private http: HttpClient,public datepipe: DatePipe) { }
  getEmployeeDetails() {
    var user=localStorage.getItem('id');
    this.http.get(this.baseurl+`employee/${user}`).subscribe(data=>{
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
  register(data:any,presentAddressID:Number,permanentAddressID:Number){
    let address=[
      {
        "id":presentAddressID,
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
        "id":permanentAddressID,
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
   
    return this.http.put(this.baseurl+`employee/${localStorage.getItem('id')}`,this.employeeDetails)

  }
  save(data:any,presentAddressID:Number,permanentAddressID:Number){
    let address=[
      {
        "id":presentAddressID,
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
        "id":permanentAddressID,
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
   return this.http.put(this.baseurl+`employee/${localStorage.getItem('id')}`,this.employeeDetails)

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
