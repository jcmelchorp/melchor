import { TestBed } from '@angular/core/testing';

import { GliphyService } from './gliphy.service';

describe('GliphyService', () => {
  let service: GliphyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GliphyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
