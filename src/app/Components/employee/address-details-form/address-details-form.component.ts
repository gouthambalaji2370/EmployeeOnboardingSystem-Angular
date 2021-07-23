import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { CountryStateDataService } from 'src/app/Services/country-state-data.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-address-details-form',
  templateUrl: './address-details-form.component.html',
  styleUrls: ['./address-details-form.component.css']
})
export class AddressDetailsFormComponent implements OnInit {
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    confirm("Reload Employee Form?");
    event.returnValue = false;
  }

  @Input()
  current: number = 0;
  @Output() goToPrevious = new EventEmitter<any>();
  presentStateInfo: any[] = [];
  permanentStateInfo: any[] = [];
  countryInfo: any[] = [];
  addressDetailsForm!: FormGroup;
  submitted: Boolean = false;
  notify: Boolean = false;
  draft: Boolean = false;
  stateName: String = "";
  countryName: String = "";
  presentStateName: String = "";
  presentCountryName: String = "";
  permanentStateName: String = "";
  permanentCountryName: String = "";
  public isSameAddressControl: FormControl = new FormControl(false);
  isDisabled: boolean = false;
  notifyText: string = "";
  constructor(private country: CountryStateDataService, private fb: FormBuilder, private employeeService: EmployeeService, public dialogService: DialogService) { }
  canDeactivate(): Observable<boolean> | boolean {

    if (!this.submitted && this.addressDetailsForm.touched) {

      return this.dialogService.confirm('Discard changes for the Employee Details?');
    }
    return true;
  }
  ngOnInit(): void {
    this.getFormInstance()
    this.getCountriesdata()
  }

  closeNotificationModal(closeModalEvent: Boolean) {
    this.notify = closeModalEvent;
    this.draft = closeModalEvent;
  }
  saveDraft() {
    let form = JSON.stringify(this.addressDetailsForm.getRawValue());
    let parseForm = JSON.parse(form)
    if (this.isSameAddressControl) {
      this.permanentCountryName = this.presentCountryName;
    }
    parseForm.presentAddress.country = this.presentCountryName;
    parseForm.presentAddress.state = this.presentStateName;
    parseForm.permanentAddress.state = this.permanentStateName;
    parseForm.permanentAddress.country = this.permanentCountryName;
    let value = this.employeeService.save(parseForm);
    if (value) {
      this.draft = !this.draft;
      this.notifyText = "User Details has been saved";
    }

  }
  previous(): void {
    this.goToPrevious.emit({ 'current': 0, 'completed': this.isDisabled });
  }
  submitForm(): void {
    this.submitted = true;
    if (this.addressDetailsForm.valid) {
      let form = JSON.stringify(this.addressDetailsForm.getRawValue());
      let parseform = JSON.parse(form)
      if (this.isSameAddressControl) {
        this.permanentCountryName = this.presentCountryName;
      }
      parseform.presentAddress.country = this.presentCountryName;
      parseform.presentAddress.state = this.presentStateName;
      parseform.permanentAddress.state = this.permanentStateName;
      parseform.permanentAddress.country = this.permanentCountryName;

      this.employeeService.register(parseform).subscribe(data=>{
        if(data.success===true){
          this.notify = true;
          this.notifyText = "User Details has been forwarded Successfully";
          this.addressDetailsForm.disable();
          this.isDisabled = true;
          this.submitted = false;
        }
        else {
          this.notify = true;
          this.notifyText = "User Details has some issues";
        }
      })
    }
  }
  getFormInstance() {
    this.addressDetailsForm = this.fb.group({
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
  getCountriesdata() {
    this.country.getAllCountriesSubject();
    this.country.countryData$.subscribe(data => {
      this.countryInfo = data.Countries;
      if(this.countryInfo.length===0){
        this.notify = true;
        this.notifyText = "Country data failed to load";
      }
    }, err => {
      console.log(err)
      
    },
    )
  }
  onChangeCountry(countryValue: any,type:Boolean) {
    if(type){
      this.presentStateInfo = this.countryInfo[countryValue].States;
      this.presentCountryName = this.countryInfo[countryValue].CountryName;

    }
    else{
      this.permanentStateInfo = this.countryInfo[countryValue].States;
      this.permanentCountryName = this.countryInfo[countryValue].CountryName;
    }
  }

  onChangeState(stateValue: any,type:Boolean) {
    if(type){
    this.presentStateName = this.presentStateInfo[stateValue].StateName
    }
    else{
      this.permanentStateName = this.permanentStateInfo[stateValue].StateName
    }
  }


}
