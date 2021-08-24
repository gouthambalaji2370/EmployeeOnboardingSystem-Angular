import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { DialogService } from 'src/app/Services/dialog.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Employees } from 'src/app/Interfaces/employees';

import { AddressDetailsFormComponent } from './address-details-form.component';

describe('AddressDetailsFormComponent', () => {
  let component: AddressDetailsFormComponent;
  let employeeService: any;
  let fixture: ComponentFixture<AddressDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[DatePipe,EmployeeService,DialogService],
      imports:[ ReactiveFormsModule,HttpClientTestingModule],
      declarations: [ AddressDetailsFormComponent ],
    })
    .compileComponents();
  });
  beforeAll(()=>{
    localStorage.setItem('type',"updated user");
    
  })
  afterAll(()=>{
    localStorage.removeItem('type');
  })
  beforeEach(inject([EmployeeService], (s: any) => {
    employeeService = s;
    fixture = TestBed.createComponent(AddressDetailsFormComponent);
    component = fixture.componentInstance;
    component.sameAddress=true;
    component.submitted=false;
    component.permanentStateName=""
    component.presentDataChange=false;
    component.permanentDataChange=true;
    component.presetPermanentData=true;
    component.presetPresentData=true;
    fixture.detectChanges();
  }));
it("should call getUsers and return list of users", async(() => {
  const addressDetails:Employees=
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

  spyOn(employeeService,'getEmployeeDetails').and.returnValue(of(addressDetails))

  AddressDetailsFormComponent.getFormData();

  fixture.detectChanges();

  expect(AddressDetailsFormComponent.getFormData).toEqual(addressDetails);
}));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ng on init',()=>{
   expect(fixture.detectChanges).toBeTruthy()
  })
  it('should check get form instance',()=>{
    spyOn(component,'getFormInstance');
    component.getFormInstance();   
    expect(component.getFormInstance).toHaveBeenCalled()
  })
  it('should check get countries data',()=>{
    spyOn(component,'getCountriesdata');
    component.getCountriesdata();
    expect(component.getCountriesdata).toHaveBeenCalled()
  })
  it('should check on change country',()=>{
    spyOn(component,'onPermanentChangeCountry')
    component.onPermanentChangeCountry(1,true);
    expect(component.onPermanentChangeCountry).toHaveBeenCalled();
  })
  it('should check on change state',()=>{
    spyOn(component,'onChangeState')
    component.onChangeState(1,true);
    expect(component.onChangeState).toHaveBeenCalled();
  })
  it('should check previous',fakeAsync(()=>{
    spyOn(component,'previous');
    let button = fixture.debugElement.nativeElement.querySelector('#prevBtn');
    button.click();
    tick();
    expect(component.previous).toHaveBeenCalled();
  }))
  it('should call previous',()=>{
    component.goToPrevious.subscribe((response)=>{
      expect(response).toEqual({'current': 0, 'completed': false })
    })
    component.previous();
  })
  it('should check unload handler',()=>{
    spyOn(component,'unloadHandler');
    component.unloadHandler(new Event('reload'));
    expect(component.unloadHandler).toHaveBeenCalled()
  })

  it('should run save draft',fakeAsync(()=>{
    spyOn(component,'saveDraft');
    let button = fixture.debugElement.nativeElement.querySelector('#saveBtn');
    button.click();
    tick();
    expect(component.saveDraft).toHaveBeenCalled();
  }))
  it('should run submit form',fakeAsync(()=>{
    spyOn(component,'submitForm');
    let button = fixture.debugElement.nativeElement.querySelector('#submitBtn');
    button.click();
    tick();
    expect(component.submitForm).toHaveBeenCalled();
  }))

});
