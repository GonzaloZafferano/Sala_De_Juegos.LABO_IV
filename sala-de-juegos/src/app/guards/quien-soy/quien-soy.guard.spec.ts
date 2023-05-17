import { TestBed } from '@angular/core/testing';

import { QuienSoyGuard } from './quien-soy.guard';

describe('QuienSoyGuard', () => {
  let guard: QuienSoyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuienSoyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
