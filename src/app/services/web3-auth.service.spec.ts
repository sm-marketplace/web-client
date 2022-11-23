import { TestBed } from '@angular/core/testing';

import { Web3AuthService } from './web3-auth.service';

describe('Web3AuthService', () => {
  let service: Web3AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
