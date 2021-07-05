import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable ,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryStateDataService {
  public Countrydata$:Subject<any> = new Subject();
  url: string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";


  constructor(private http: HttpClient) { }

  allCountries(): Observable<any> {
    return this.http.get(this.url);
  }
  allCountriesSubject() {
    return this.http.get(this.url).subscribe(data =>{
      this.Countrydata$.next(data); // same data
    });
 }

}
