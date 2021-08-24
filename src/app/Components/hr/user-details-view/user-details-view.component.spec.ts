import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailsviewComponent } from './user-details-view.component';

describe('UserdetailsviewComponent', () => {
  let component: UserdetailsviewComponent;
  let fixture: ComponentFixture<UserdetailsviewComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ UserdetailsviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
   
    fixture = TestBed.createComponent(UserdetailsviewComponent);
    component = fixture.componentInstance;
    component.addressDetails=false;
    component.basicDetails=false;
    component.employeeDetails= [{
      "EmpId":"123",
      "Name":"Indraneel",
      "Email":"n@gmail.com",
      "Status":"Completed",
      "CreatedAt":"20-06-2021",
  }]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check approve data',()=>{
    spyOn(component,'approveData');
    component.approveData('2301');
    expect(component.approveData).toHaveBeenCalled()
  })
  it('should check open details',()=>{
    spyOn(component,'openDetails').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#basicDetails');
    console.log(button);
    button.click();
    fixture.detectChanges();
    expect(component.openDetails).toHaveBeenCalledWith("Basic");
  })
  it('should check open details',()=>{
    spyOn(component,'openDetails').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#addressDetails');
    button.click();
    fixture.detectChanges();
    expect(component.openDetails).toHaveBeenCalledWith("Address")
  })
  it('should check close notification modal else case',()=>{
    spyOn(component,'closeNotificationModal');
    component.closeNotificationModal(false);
    expect(component.closeNotificationModal).toHaveBeenCalled()
  })
  it('should check close notification modal if case',()=>{
    spyOn(component,'closeNotificationModal');
    component.closeNotificationModal(true);
    expect(component.closeNotificationModal).toHaveBeenCalled()
  })
  it('should call close invite event',()=>{
    component.closeDetailsView.subscribe((response)=>{
      expect(response).toEqual(false)
    })
    component.approveData('123');
  })
  it('should call reject view event',()=>{
    component.rejectReasonView.subscribe((response)=>{
      expect(response).toEqual(true)
    })
    component.closeNotificationModal(true);
  })
});
