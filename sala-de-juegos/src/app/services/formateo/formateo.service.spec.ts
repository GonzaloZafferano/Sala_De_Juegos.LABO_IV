import { TestBed } from '@angular/core/testing';

import { FormateoService } from './formateo.service';

describe('FormateoService', () => {
  let service: FormateoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormateoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
