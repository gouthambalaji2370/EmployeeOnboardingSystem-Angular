export interface Employees {
    EmpId: number;
    Name: string;
    Email:String;
    Status:String;
    CreatedAt:String;
    aadharNumber: String;
    bloodGroup:String;
    dob: String;
    emailID: String;
    emergencyContactName: String;
    emergencyContactNumber:String;
    fatherName:String;
      firstName: String;
      gender: String;
      hscScore: String;
      lastName: String;
    motherName: String;
      phoneNumber: String;
      emergencyContactRelation: String;
      sslcScore: String;
      ugScore:String;
      addressSet:[
        {
            id:String;
            type:String;
            flatName:String;
             area:String;
             district:String;
             country:String;
             state:String;
             street:String;
             pincode:String;
             mapCoordinates:String;
           
          }
    ];

}
