import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteformComponent } from './inviteform.component';

describe('InviteformComponent', () => {
  let component: InviteformComponent;
  let fixture: ComponentFixture<InviteformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
