import { TestBed } from '@angular/core/testing';

import { CountryStateDataService } from '../country-state-data.service';

describe('CountryStateDataService', () => {
  let service: CountryStateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryStateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
