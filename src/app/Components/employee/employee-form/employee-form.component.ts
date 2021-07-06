import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CountryStateDataService } from '../../../Services/country-state-data.service';
import { tap, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { data } from 'jquery';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employeeform',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeformComponent implements OnInit {
  registrationForm!: FormGroup;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  notify: Boolean = false;
  draft: Boolean = false;
  notifyText:String="";
  selectedcountry!: Number;
  selectedstate!: Number;
  stateName: String = "";
  countryName: String = "";
  current: number = 0;
  isDisabled:Boolean=false;
  public isSameAddressControl: FormControl = new FormControl(false);
  public submitted: Boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private country: CountryStateDataService,private employee:EmployeeService) {
  }

  saveDraft() {
    let form=JSON.stringify(this.registrationForm.value);
    let value=this.employee.save(form);
    if(value){
      this.draft = !this.draft;
      this.notifyText="User Details has been saved";
    }

  }
  CloseNotification(closeEvent: Boolean) {
    this.notify = closeEvent;
    this.draft = closeEvent;
  }
  ngOnInit(): void {
    this.getCountries();
    this.getFormInstance();
  }
  getCountries() {
    this.country.Countrydata$.subscribe(data=>{
      console.log(data);
    },err=>console.log(err),
    ()=>console.log('complete')
    )
    this.country.allCountries().
      subscribe(
        data => {
          this.countryInfo = data.Countries;
        },
        err => console.log(err),
        () => console.log('complete')
      )
  }
  getFormInstance(){
    this.registrationForm = this.fb.group({
      userDetails: new FormGroup({
        firstName: new FormControl("",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z]*$"),
          ]
        ),

        lastName: new FormControl("",
          [
            Validators.required,
            Validators.pattern("[a-zA-Z]*")
          ],
        ),

        phoneNumber: new FormControl("",
          [
            Validators.required,
            Validators.pattern("[0-9]{10}"),
          ],
        ),

        emailID: new FormControl("",
          [
            Validators.required,
            Validators.email
          ],
        ),

        bloodGroup: new FormControl("",
          [
            Validators.required,
          ]),

        aadharNumber: new FormControl("",
          [
            Validators.required,
            Validators.pattern("[0-9]*"),
            Validators.minLength(12),
            Validators.maxLength(12)
          ]),

        dob: new FormControl("",
          [
            Validators.required
          ]),
        gender: new FormControl("",
          [
            Validators.required
          ]),

        sslc: new FormControl("",
          [
            Validators.required
          ]),

        hsc: new FormControl("",
          [
            Validators.required
          ]),

        ug: new FormControl("",
          [
            Validators.required
          ]),

        fatherName: new FormControl("",
          [
            Validators.required,
            Validators.pattern("[a-zA-Z]*")
          ]),

        motherName: new FormControl("",
          [
            Validators.required,
            Validators.pattern("[a-zA-Z]*")
          ]),
        emergencyContactName: new FormControl("",
          [
            Validators.required,
            Validators.pattern("[a-zA-Z]*")
          ]),

        relation: new FormControl("",
          [
            Validators.required,
            Validators.pattern("[a-zA-Z]*")
          ]),

        emergencyContactNumber: new FormControl("",
          [
            Validators.required,
            Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
            
          ]),

      }),

      addressDetails: new FormGroup({
        presentAddress: new FormGroup({
          flatName: new FormControl("",
            [
              Validators.required

            ]
          ),

          streetName: new FormControl("",
            [
              Validators.required
            ]
          ),

          area: new FormControl("",
            [
              Validators.required
            ]
          ),
          country: new FormControl("",
            [
              Validators.required
            ]
          ),
          state: new FormControl("",
            [
              Validators.required
            ]
          ),
          city: new FormControl("",
            [
              Validators.required
            ]
          ),

          mapCoordinates: new FormControl("",
            [
              Validators.required
            ]
          ),

          pinCode: new FormControl("",
            [
              Validators.required,
              Validators.pattern("^[0-9]*$"),
              Validators.minLength(6),
              Validators.maxLength(6)
            ]
          ),

        }),

        permanentAddress: new FormGroup({
          flatName: new FormControl("",
            [
              Validators.required

            ]
          ),

          streetName: new FormControl("",
            [
              Validators.required
            ]
          ),

          area: new FormControl("",
            [
              Validators.required
            ]
          ),
          country: new FormControl("",
            [
              Validators.required
            ]
          ),
          state: new FormControl("",
            [
              Validators.required
            ]
          ),
          city: new FormControl("",
            [
              Validators.required
            ]
          ),
          mapCoordinates: new FormControl("",
            [
              Validators.required
            ]
          ),

          pinCode: new FormControl("",
            [
              Validators.required,
              Validators.pattern("^[0-9]*$"),
              Validators.minLength(6),
              Validators.maxLength(6)
            ]
          ),

        }),
      })
    }); 
    this.isSameAddressControl.valueChanges.pipe(distinctUntilChanged(),
    switchMap(isSameAddress => {
      if (isSameAddress) {
        return this.registrationForm.get('addressDetails.presentAddress')!
          .valueChanges
          .pipe(
            startWith(this.registrationForm.get('addressDetails.presentAddress')!.value),
            tap(value =>
              this.registrationForm.get('addressDetails.permanentAddress')!.setValue(value)
            )
          )
      } else {
        this.registrationForm.get('addressDetails.permanentAddress')!.reset();
        return EMPTY;
      }
    })
  )
  .subscribe();
  }

  onChangeCountry(countryValue: any) {
    this.stateInfo = this.countryInfo[countryValue].States;
    this.countryName = this.countryInfo[countryValue].countryName
    this.selectedcountry = countryValue;
  }

  onChangeState(stateValue: any) {
    this.stateName = this.stateInfo[stateValue].stateName
    this.selectedstate = stateValue;
  }

  get firstName() {
    return this.registrationForm.get("userDetails.firstName");
  }
  get lastName() {
    return this.registrationForm.get("userDetails.lastName");
  }
  get phoneNumber() {
    return this.registrationForm.get("userDetails.phoneNumber");
  }
  get emailID() {
    return this.registrationForm.get("userDetails.emailID");
  }
  get bloodGroup() {
    return this.registrationForm.get("userDetails.bloodGroup");
  }
  get gender() {
    return this.registrationForm.get("userDetails.gender");
  }
  get aadharNumber() {
    return this.registrationForm.get("userDetails.aadharNumber");
  }
  get dob() {
    return this.registrationForm.get("userDetails.dob");
  }
  get sslc() {
    return this.registrationForm.get("userDetails.sslc");
  }
  get hsc() {
    return this.registrationForm.get("userDetails.hsc");
  }
  get ug() {
    return this.registrationForm.get("userDetails.ug");
  }
  get fatherName() {
    return this.registrationForm.get("userDetails.fatherName");
  }
  get motherName() {
    return this.registrationForm.get("userDetails.motherName");
  }
  get emergencyContactName() {
    return this.registrationForm.get("userDetails.emergencyContactName");
  }
  get relation() {
    return this.registrationForm.get("userDetails.relation");
  }
  get emergencyContactNumber() {
    return this.registrationForm.get("userDetails.emergencyContactNumber");
  }
 




  validateBaseDetails(move_to: number): void {
    this.submitted = true;
    console.log(this.gender?.errors);
    console.log(this.registrationForm.disabled);
    if (this.registrationForm.controls.userDetails.valid || this.isDisabled===true) {
      this.current += move_to;
      console.log(this.current);
      this.submitted = false;
    }
    else {
      console.log(this.registrationForm.status);
      console.log("this form has errors else case");
    }
  }

  nextPrev(move_to: number): void {
    this.current += move_to;
  }


  finalSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.controls.addressDetails.valid) {
      let form=JSON.stringify(this.registrationForm.value);
      let value=this.employee.register(form);
      if(value){
        this.notify = true;
        this.notifyText="User Details has been forwarded Successfully";
        console.log("Form is submitted successfully")
        this.registrationForm.disable();
        this.isDisabled=true;
        this.submitted = false;
      }
    }
    else {
      console.log(this.registrationForm.status, this.registrationForm.controls.addressDetails.invalid);
      console.log("this form has errors else case addressDetails");
    }
  }
}
