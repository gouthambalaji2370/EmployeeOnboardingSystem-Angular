import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../../core/header/header.component';
import { HRTableComponent } from './hr-table.component';

describe('HrtableComponent', () => {
  let component: HRTableComponent;
  let fixture: ComponentFixture<HRTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,ReactiveFormsModule,RouterTestingModule],
      declarations: [ HRTableComponent ,HeaderComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check reject form initalize',()=>{
    spyOn(component,'RejectFormInitalize');
    component.RejectFormInitalize();
    expect(component.RejectFormInitalize).toHaveBeenCalled()
  })
  it('should check get employee data',()=>{
    spyOn(component,'getEmployeeData');
    component.getEmployeeData();
    expect(component.getEmployeeData).toHaveBeenCalled()
  })
  it('should check submit reject form ',()=>{
    spyOn(component,'submitRejectForm');
    component.submitRejectForm();
    expect(component.submitRejectForm).toHaveBeenCalled()
  })
  it('should check open invite ',()=>{
    spyOn(component,'openInvite');
    component.openInvite();
    expect(component.openInvite).toHaveBeenCalled()
  })
  it('should employees data',()=>{
    expect('employees').toBeTruthy();
  })
//   it("check for not null or undefined", (()=>{
//    let a= component?.employee.length();
//    expect(a).toBeGreaterThan(0);
// }));

    // it('should set up window eventListener', () => {
    //   spyOn(window, 'addEventListener');
    //   component.unloadHandler(new Event('change'));
    //   expect(window.addEventListener).toHaveBeenCalledWith('beforeunload', component.unloadHandler);
    // });
  
    // it('should call closeConnection()', () => {
    //   spyOn(component, 'unloadHandler');
    //   component.unloadHandler(new Event('change'));
    //   window.dispatchEvent(new Event('beforeunload'));
    //   expect(component.unloadHandler).toHaveBeenCalled();
    // });


  // it('should check close invite ',()=>{
  //   spyOn(component,'closeInvite');
  //   component.closeInvite(false);
  //   expect(component.openInvite).toHaveBeenCalled()
  // })
  // it('should check open notification modal  ',()=>{
  //   spyOn(component,'openNotificationModal');
  //   component.openNotificationModal(true);
  //   expect(component.openInvite).toHaveBeenCalled()
  // })
  // it('should check close notification modal',()=>{
  //   spyOn(component,'closeNotification');
  //   component.closeNotification(true);
  //   expect(component.closeNotification).toHaveBeenCalled()
  // })
  it('should check reject view modal',()=>{
    spyOn(component,'rejectViewModal');
    component.rejectViewModal(false);
    expect(component.rejectViewModal).toHaveBeenCalled()
  })
  it('should check close view modal',()=>{
    spyOn(component,'closeViewModal');
    component.closeViewModal(false);
    expect(component.closeViewModal).toHaveBeenCalled()
  })
  it('should check back to view modal',()=>{
    spyOn(component,'backToViewModal');
    component.backToViewModal();
    expect(component.backToViewModal).toHaveBeenCalled()
  })
  it('should check close reject modal',()=>{
    spyOn(component,'closeRejectModal');
    component.closeRejectModal();
    expect(component.closeRejectModal).toHaveBeenCalled()
  })
  it('should check close reject modal',()=>{
    spyOn(component,'openViewModal');
    component.openViewModal(2);
    expect(component.openViewModal).toHaveBeenCalled()
  })
  

  // it('should check open notification modal ',fakeAsync(()=>{
  //   spyOn(component,'openNotificationModal');
  //   let button = fixture.debugElement.nativeElement.querySelector('#notificationModal');
  //   button.click();
  //   tick();
  //   expect(component.openNotificationModal).toHaveBeenCalled();
  // }))
  

});
