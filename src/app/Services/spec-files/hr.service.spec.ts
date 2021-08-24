import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HrService } from '../hr.service';
import {Employees} from '../../Interfaces/employees';
import { Role } from "../../Interfaces/role";
import { Invite } from "../../Interfaces/invite";

describe('HrService', () => {
  let service: HrService;
  let httpTestingController: HttpTestingController
  let traveller: Employees;
  let roleset:Role;
  let invite:Invite;
  let status:any;
  let baseurl="http://localhost:8080/";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(HrService);
  });

  traveller=
    {
      EmpId: 0,
      Name: "",
      Email:"",
      Status:"",
      CreatedAt:"",
      aadharNumber:"",
      bloodGroup:"",
      dob:"",
      emailID:"",
      emergencyContactName:"",
      emergencyContactNumber:"",
      fatherName:"",
        firstName:"",
        gender:"",
        hscScore:"",
        lastName:"",
      motherName:"",
        phoneNumber:"",
        emergencyContactRelation:"",
        sslcScore:"",
        ugScore:"",
        addressSet:[
            {
              id:"",
              type:"present",
              flatName:"",
               area:"",
               district:"",
               country:"",
               state:"",
               street:"",
               pincode:"",
               mapCoordinates:"",
             
            }
      ]
  };
  roleset={
    id:"10",
    role:"software"
  }
  status={
    empId:"1",
    action:"approve",
    reason:null
  }
  invite={
    name:"rammfa",
    email:"ajdnsa@gmadfl.com",
    role:"engineer",
    password:"Abcd@1023"
  }
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("should return employees", () => {
    let result: any;
    service.getEmployees();
     service.employees$.subscribe(data=>{
       result=data;
     })
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseurl+'employees'
    });
   
    req.flush([traveller]);
   
    expect(result[0]).toEqual(traveller);
  });
  it("should return roles", () => {
    let result: any;
    service.getRoles();
     service.roles$.subscribe(data=>{
       result=data;
     })
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseurl+'role'
    });
   
    req.flush([roleset]);
   
    expect(result[0]).toEqual(roleset);
  });
  it("should call POST API to create a new employee", () => {
    service.createEmployee(invite).subscribe();
   
    let req = httpTestingController.expectOne({ method: "POST", url: baseurl+'employee' });
    expect(req.request.body).toEqual(invite);
  });
  it("should call POST API to create a new employee", () => {
    service.notifyEmployee(1).subscribe();
   
    let req = httpTestingController.expectOne({ method: "POST", url: baseurl+`employee/1/notification` });
    expect(req.request.body).toEqual(1);
  });
  it("should call patch API to update status", () => {
    service.rejectEmployeeData(status).subscribe();
   
    let req = httpTestingController.expectOne({
      method: "PUT",
      url: baseurl+`employee/${status.empId}/status`
    });
    expect(req.request.body).toEqual(status);
  });
});
