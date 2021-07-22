import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailsviewComponent } from './user-details-view.component';

describe('UserdetailsviewComponent', () => {
  let component: UserdetailsviewComponent;
  let fixture: ComponentFixture<UserdetailsviewComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      
      declarations: [ UserdetailsviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetailsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
