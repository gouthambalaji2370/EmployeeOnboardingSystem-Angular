import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Role} from '../role';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-inviteform',
  templateUrl: './inviteform.component.html',
  styleUrls: ['./inviteform.component.css']
})
export class InviteformComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  @Input()
  open:Boolean=false;
  @Output()
  closeEvent = new EventEmitter<Boolean>();
  // type MyArrayType = Array<{id: String, role: String}>;
  inviteForm!:FormGroup;
  public roles:Role[] = [
    {id: 'Software Engineer', role: 'Software Engineer'},
    {id: 'Senior Software Engineer', role: 'Senior Software Engineer'},
    {id: 'Associate Software Engineer', role: 'Associate Software Engineer'}
];



  close:Boolean=false;
  isSubmitted:Boolean=false;
    ngOnInit(): void {
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
  closemodal():void{
    this.open=!this.open
    this.closeEvent.emit(false);
  }
  createinvite():void{
    console.log("hello")
    this.isSubmitted=true;
    console.log(this.password);
    if(this.inviteForm.valid)
    {
      this.open=!this.open
      this.closeEvent.emit(false);
  }
  }
  closeout():void{
    this.open=false
    this.closeEvent.emit(false);
  }

}
