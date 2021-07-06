import { TestBed } from '@angular/core/testing';

import { RolebasedguardService } from '../role-based-guard.service';

describe('RolebasedguardService', () => {
  let service: RolebasedguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolebasedguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
