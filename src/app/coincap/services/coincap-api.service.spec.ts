/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoincapApiService } from './coincap-api.service';

describe('Service: CoincapApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoincapApiService]
    });
  });

  it('should ...', inject([CoincapApiService], (service: CoincapApiService) => {
    expect(service).toBeTruthy();
  }));
});
