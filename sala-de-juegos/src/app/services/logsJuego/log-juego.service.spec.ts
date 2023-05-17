import { TestBed } from '@angular/core/testing';

import { LogJuegoService } from './log-juego.service';

describe('LogJuegoService', () => {
  let service: LogJuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogJuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
