import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';

import { InviteformComponent } from './invite-form.component';

describe('InviteformComponent', () => {
  let component: InviteformComponent;
  let fixture: ComponentFixture<InviteformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule,HttpClientTestingModule,CoreModule]
    ,
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
