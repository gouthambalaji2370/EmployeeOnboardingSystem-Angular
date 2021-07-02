import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators,FormBuilder, FormControl } from '@angular/forms';
import { CscService } from '../../../Services/csc.service';
import { tap, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { EMPTY } from 'rxjs';



@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})
export class EmployeeformComponent implements OnInit {
  registrationForm!: FormGroup;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  notify:Boolean=false;
  draft:Boolean=false;
  selectedcountry!:Number;
  selectedstate!:Number;
  stateName:String="";
  countryName:String="";
  samevalue: Boolean=false;
  current:number=0;
  public isSameAddressControl: FormControl = new FormControl(false);
  public submitted : Boolean=false;
  constructor(http:HttpClient,private router:Router, private fb : FormBuilder,private country:CscService) {
   }


logout():void{
  this.router.navigate(['/'])
}
saveDraft(){
  this.draft=!this.draft;
}
addItem(newItem: Boolean) {
  this.notify=newItem;
  this.draft=newItem
 }
  ngOnInit(): void {
    this.getCountries();
    this.registrationForm = this.fb.group({
      userDetails:new FormGroup({
      fname: new FormControl("", 
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z]*$"),
        ]
      ),

      lname: new FormControl("",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z]*")
        ],
      ),

      pno: new FormControl("",
        [
          Validators.required,
          Validators.pattern("[0-9]{10}"),
        ],
      ),

      emailid: new FormControl("",
      [
        Validators.required,
       Validators.email
      ],
      ),

      bloodgroup: new FormControl("",
      [
        Validators.required,
      ]),

      ano: new FormControl("",
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

      fathername: new FormControl("",
      [
        Validators.required,
        Validators.pattern("[a-zA-Z]*")
      ]),

      mothername: new FormControl("",
      [
        Validators.required,
        Validators.pattern("[a-zA-Z]*")
      ]),

      role: new FormControl("",
      [
        Validators.required
      ]),

      ename: new FormControl("",
      [
        Validators.required,
        Validators.pattern("[a-zA-Z]*")
      ]),

      relation: new FormControl("",
      [
        Validators.required,
        Validators.pattern("[a-zA-Z]*")
      ]),

      econtact: new FormControl("",
      [
        Validators.required,
        Validators.pattern("[0-9]{10}")
      ]),

    }),

    addressDetails : new FormGroup({
      presentAddress : new FormGroup({
        flatname: new FormControl("", 
      [
          Validators.required
        
        ]
      ),

      streetname: new FormControl("", 
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

      mapcoordinates: new FormControl("", 
      [
        Validators.required
        ]
      ),

      pincode: new FormControl("", 
      [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(6),
        Validators.maxLength(6)
        ]
      ),

      }),

      permanentAddress : new FormGroup({
        flatname: new FormControl("", 
        [
            Validators.required
          
          ]
        ),
  
        streetname: new FormControl("", 
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
        mapcoordinates: new FormControl("", 
        [
          Validators.required
        ]
        ),

        pincode: new FormControl("", 
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
    this.isSameAddressControl
    .valueChanges
    .pipe(
      distinctUntilChanged(),
      switchMap(isSameAddress => {
        if (isSameAddress) {
          return this.registrationForm.get('addressDetails.presentAddress')!
            .valueChanges
            .pipe(
              // at the beginning fill the form with the current values
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
  getCountries(){
    this.country.allCountries().
    subscribe(
      data2 => {
        this.countryInfo=data2.Countries;
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  onChangeCountry(countryValue:any) {
    this.stateInfo=this.countryInfo[countryValue].States;
    console.log("country",countryValue)
    console.log("name",this.countryInfo[countryValue].countryName)
    this.countryName=this.countryInfo[countryValue].countryName
    this.selectedcountry=countryValue;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue:any) {
    console.log(stateValue);
    console.log("state",stateValue)
    console.log("name",this.stateInfo[stateValue].stateName)
    this.stateName=this.stateInfo[stateValue].stateName
    this.selectedstate=stateValue;
    console.log(this.cityInfo);
  }
  
 

  get fname(){
    return this.registrationForm.get("userDetails.fname");
  }
  get lname(){
    return this.registrationForm.get("userDetails.lname");
  }
  get pno(){
    return this.registrationForm.get("userDetails.pno");
  }
  get emailid(){
    return this.registrationForm.get("userDetails.emailid");
  }
  get bloodgroup(){
    return this.registrationForm.get("userDetails.bloodgroup");
  }
  get ano(){
    return this.registrationForm.get("userDetails.ano");
  }
  get dob(){
    return this.registrationForm.get("userDetails.dob");
  }
  get sslc(){
    return this.registrationForm.get("userDetails.sslc");
  }
  get hsc(){
    return this.registrationForm.get("userDetails.hsc");
  }
  get ug(){
    return this.registrationForm.get("userDetails.ug");
  }
  get fathername(){
    return this.registrationForm.get("userDetails.fathername");
  }
  get mothername(){
    return this.registrationForm.get("userDetails.mothername");
  }
  get role(){
    return this.registrationForm.get("userDetails.role");
  }
  get ename(){
    return this.registrationForm.get("userDetails.ename");
  }
  get relation(){
    return this.registrationForm.get("userDetails.relation");
  }
  get econtact(){
    return this.registrationForm.get("userDetails.econtact");
  }
  get presentflatname(){
    return this.registrationForm.get("addressDetails.presentflatname");
  }
  get presentstreetname(){
    return this.registrationForm.get("addressDetails.presentstreetname");
  }
  get presentarea(){
    return this.registrationForm.get("addressDetails.presentarea");
  }
  get presentcountry(){
    return this.registrationForm.get("addressDetails.presentcountry");
  }
  get presentstate(){
    return this.registrationForm.get("addressDetails.presentstate");
  }
  get presentcity(){
    return this.registrationForm.get("addressDetails.presentcity");
  }
  get permanentcity(){
    return this.registrationForm.get("addressDetails.permanentcity");
  }
  get permanentcountry(){
    return this.registrationForm.get("addressDetails.permanentcountry");
  }
  get permanentstate(){
    return this.registrationForm.get("addressDetails.permanentstate");
  }
  get presentMapCoordinates(){
    return this.registrationForm.get("addressDetails.presentMapCoordinates");
  }
  get presentPincode(){
    return this.registrationForm.get("addressDetails.presentPincode");
  }
  get permanentflatname(){
    return this.registrationForm.get("addressDetails.permanentflatname")
  }
  get permanentstreetname(){
    return this.registrationForm.get("addressDetails.permanentstreetname");
  }
  get permanentarea(){
    return this.registrationForm.get("addressDetails.permanentarea");
  }
  get permanentmapcoordinates(){
    return this.registrationForm.get("addressDetails.permanentmapcoordinates");
  }
  get permanentpincode(){
    return this.registrationForm.get("addressDetails.permanentpincode");
  }
  

  

  
  testResults(move_to:number):void{
    this.submitted = true;
    
      if(this.registrationForm.controls.userDetails.valid){
      
        this.current+=move_to;
        console.log(this.current);
        this.submitted=false;
      }
      else{
        console.log(this.registrationForm.status);
        console.log("this form has errors else case");
      }
  }

  nextPrev(move_to:number):void{
    this.current+=move_to;
  }


  finalSubmit():void{
    this.submitted=true;
    
    if(this.registrationForm.controls.addressDetails.valid ){
      this.notify=true;
      console.log("Form is submitted successfully")
      this.registrationForm.disable();
      this.submitted=false;
    }
    else{
      console.log(this.registrationForm.status,this.registrationForm.controls.addressDetails.invalid);
      console.log("this form has errors else case addressDetails");
    }
  }

  

}
