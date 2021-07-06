import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { CountryStateDataService } from 'src/app/Services/country-state-data.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  @Input()
  current:number=0;
  @Output() currentback = new EventEmitter<any>();
  presentStateInfo: any[] = [];
  permanentStateInfo: any[] = [];
  countryInfo: any[] = [];
  addressDetailsForm!:FormGroup;
  submitted:Boolean=false;
  notify: Boolean = false;
  draft: Boolean = false;
  selectedcountry!: Number;
  selectedstate!: Number;
  stateName: String = "";
  countryName: String = "";
  presentStateName:String="";
  presentCountryName:String="";
  permanentStateName:String="";
  permanentCountryName:String="";
  public isSameAddressControl: FormControl = new FormControl(false);
  isDisabled: boolean=false;
  notifyText: string="";
  constructor( private country: CountryStateDataService,private fb: FormBuilder,private employeeService: EmployeeService,public dialogService:DialogService) { }
  canDeactivate(): Observable<boolean> | boolean {

    if (!this.submitted&& this.addressDetailsForm.touched) {

        return this.dialogService.confirm('Discard changes for the Employee Details?');
    }
    return true;
}	
  ngOnInit(): void {
    this.getformInstance()
    this.getCountries()
  }

  CloseNotification(closeEvent: Boolean) {
    this.notify = closeEvent;
    this.draft = closeEvent;
  }
  saveDraft() {
    let form=JSON.stringify(this.addressDetailsForm.getRawValue());
    let parseform= JSON.parse(form)
    if(this.isSameAddressControl){
      this.permanentCountryName=this.presentCountryName;
   }
    parseform.presentAddress.country=this.presentCountryName;
    parseform.presentAddress.state=this.presentStateName;
    parseform.permanentAddress.state=this.permanentStateName;
    parseform.permanentAddress.country=this.permanentCountryName;
    let value=this.employeeService.save(parseform);
    if(value){
      this.draft = !this.draft;
      this.notifyText="User Details has been saved";
    }

  }
  nextPrev(): void {
    this.currentback.emit({'current':0,'completed':this.isDisabled});
  }
  finalSubmit(): void {
    this.submitted = true;
    if (this.addressDetailsForm.valid) {
      let form=JSON.stringify(this.addressDetailsForm.getRawValue());
     let parseform= JSON.parse(form)
     if(this.isSameAddressControl){
       this.permanentCountryName=this.presentCountryName;
    }
     parseform.presentAddress.country=this.presentCountryName;
     parseform.presentAddress.state=this.presentStateName;
     parseform.permanentAddress.state=this.permanentStateName;
     parseform.permanentAddress.country=this.permanentCountryName;
    
      let value=this.employeeService.register(parseform);
      if(value){
        this.notify = true;
        this.notifyText="User Details has been forwarded Successfully";
        console.log("Form is submitted successfully")
        this.addressDetailsForm.disable();
        this.isDisabled=true;
        this.submitted = false;
      }
    }
    else {
      console.log("this form has errors else case addressDetails");
    }
  }
getformInstance(){
  this.addressDetailsForm= this.fb.group({
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
  this.isSameAddressControl.valueChanges.pipe(distinctUntilChanged(),
  switchMap(isSameAddress => {
    if (isSameAddress) {
      return this.addressDetailsForm.get('presentAddress')!
        .valueChanges
        .pipe(
          startWith(this.addressDetailsForm.get('presentAddress')!.value),
          tap(value =>
            this.addressDetailsForm.get('permanentAddress')!.setValue(value)
          )
        )
    } else {
      this.addressDetailsForm.get('permanentAddress')!.reset();
      return EMPTY;
    }
  })
)
.subscribe();
}
  getCountries() {
    this.country.allCountriesSubject();
    this.country.Countrydata$.subscribe(data=>{
      console.log(data);
      this.countryInfo = data.Countries;
    },err=>console.log(err),
    ()=>console.log('complete')
    )
  }
  onChangeCountrypresent(countryValue: any) {
      this.presentStateInfo = this.countryInfo[countryValue].States;
      this.presentCountryName = this.countryInfo[countryValue].CountryName;    

  }
  onChangeCountrypermanent(countryValue: any) {
      this.permanentStateInfo = this.countryInfo[countryValue].States;
      this.presentCountryName = this.countryInfo[countryValue].CountryName;
  }

  onChangeStatepresent(stateValue: any) {
    this.presentStateName = this.presentStateInfo[stateValue].StateName
}
onChangeStatepermanent(stateValue: any) {
  this.permanentStateName = this.permanentStateInfo[stateValue].StateName
}


}
