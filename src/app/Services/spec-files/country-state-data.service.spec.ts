import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CountryStateDataService } from '../country-state-data.service';

describe('CountryStateDataService', () => {
  let service: CountryStateDataService;
  let httpTestingController: HttpTestingController;
  let baseurl="http://localhost:8080/";
  let traveller:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.inject(CountryStateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("should return employee", () => {
    let result: any;
    service.getAllCountriesSubject();
    service.countryData$.subscribe(data=>{
       result=data;
     })
    const req = httpTestingController.expectOne({
      method: "GET",
      url:'../../assets/countries.json'
    });
   
    req.flush([traveller]);
   
    expect(result[0]).toEqual(traveller);
  });
});
