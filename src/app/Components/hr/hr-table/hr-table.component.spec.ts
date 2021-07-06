import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRTableComponent } from './hr-table.component';

describe('HrtableComponent', () => {
  let component: HRTableComponent;
  let fixture: ComponentFixture<HRTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRTableComponent ]
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
});
