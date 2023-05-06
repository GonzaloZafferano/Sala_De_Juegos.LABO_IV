import { TestBed } from '@angular/core/testing';

import { LogsDeUsuarioService } from './logs-de-usuario.service';

describe('LogsDeUsuarioService', () => {
  let service: LogsDeUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsDeUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
