import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtableComponent } from './hrtable.component';

describe('HrtableComponent', () => {
  let component: HrtableComponent;
  let fixture: ComponentFixture<HrtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
