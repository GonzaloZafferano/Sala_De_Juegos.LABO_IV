import { TestBed } from '@angular/core/testing';

import { ToastPredeterminadosService } from './toast-predeterminados.service';

describe('ToastPredeterminadosService', () => {
  let service: ToastPredeterminadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastPredeterminadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
