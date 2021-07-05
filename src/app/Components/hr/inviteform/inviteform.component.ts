import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '../../../Interfaces/role';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HrService } from 'src/app/Services/hr.service';
@Component({
  selector: 'app-inviteform',
  templateUrl: './inviteform.component.html',
  styleUrls: ['./inviteform.component.css']
})
export class InviteformComponent implements OnInit {

  constructor(private fb: FormBuilder,private  hr:HrService) {  }
  @Input()
  open: Boolean = false;
  @Output()
  closeEvent = new EventEmitter<Boolean>();
  inviteForm!: FormGroup;
  public roles: Role[] = [];



  close: Boolean = false;
  isSubmitted: Boolean = false;
  ngOnInit(): void {
    this.hr.listRoles();
    this.hr.roles$.subscribe((data) => {
      console.log(data, typeof data, "httpdata");
      this.roles=data.sets;
      console.log(this.roles);
    });
    this.inviteForm = this.fb.group({
      name: ["",
        [
          Validators.required
        ]
      ],
      email: ["",
        [
          Validators.required,
          Validators.email
        ]
      ],
      role: ["",
        [
          Validators.required
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(8),
        ],
      ],
    });
  }
  get name() {
    return this.inviteForm.get("name");
  }
  get email() {
    return this.inviteForm.get("email");
  }
  get role() {
    return this.inviteForm.get("role");
  }
  get password() {
    return this.inviteForm.get("password");
  }
  closemodal(): void {
    this.open = !this.open
    this.closeEvent.emit(false);
  }
  createinvite(): void {
    this.isSubmitted = true;
    console.log(this.password);
    if (this.inviteForm.valid) {
      let form=JSON.stringify({'name':this.name?.value,'email':this.email?.value,'role':this.role?.value,'password':this.password?.value});
      let submit=this.hr.createuser(form);
      if(submit){
      this.open = !this.open
      this.closeEvent.emit(false);
    }
    }
  }
  closeout(): void {
    this.open = false
    this.closeEvent.emit(false);
  }

}
