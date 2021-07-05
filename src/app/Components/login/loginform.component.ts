import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  invalidemail: Boolean = false;
  invalidpassword: Boolean = false;
  status: Boolean = false;
  erroremail: String = "";
  errorpassword: String = "";
  loginForm!: FormGroup;
  errorMessage = {
    userName: {
      empty: "*UserName is required",
      valid: "*Enter valid Username"
    },
    password: {
      empty: "*Password is required",
      minLegth: "Password must have atleast 5 characters",
      pattern: "Numbers only allowed",
    },
  };
  userNameErrorMsg: String = "";
  passwordErrorMsg: String = "";
  isSubmitted: Boolean = false;
  constructor(private login: LoginService, http: HttpClient, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ["",
        [
          Validators.required,
          Validators.email
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
  get userName() {
    return this.loginForm.get("userName");
  }

  get password() {
    return this.loginForm.get("password");
  }
  validateForm() {
    let hasError = false;
    console.log(this.userName);
    if (this.userName?.errors && this.userName?.errors.required) {
      this.userNameErrorMsg = this.errorMessage.userName.empty;
      hasError = true;
    }
    if (this.userName?.errors && this.userName?.errors.email) {
      this.userNameErrorMsg = this.errorMessage.userName.valid;
      hasError = true;
    }
    if (this.password?.errors) {
      if (this.password.errors.required) {
        this.passwordErrorMsg = this.errorMessage.password.empty;
      } else if (this.password.errors.pattern) {
        this.passwordErrorMsg = this.errorMessage.password.pattern;
      } else {
        this.passwordErrorMsg = this.errorMessage.password.minLegth;
      }
      hasError = true;
    }
    return hasError;
  }
  loginmethod(): void {
    this.isSubmitted = true
    if (this.loginForm.valid) {
      var formData: any = new FormData();
      console.log(formData);
      // using subject
      this.login.checkuser({
        email: this.userName?.value,
        password: this.password?.value,
      })
      if (this.userName?.value === 'hr@gmail.com'){
        localStorage.setItem('user', 'HR');
        this.router.navigate(['/hr'])
      }
      else if (this.userName?.value === 'user@gmail.com'){
        localStorage.setItem('user', 'Employee');
        this.router.navigate(['/employee'])
      }

    }
  }

}
