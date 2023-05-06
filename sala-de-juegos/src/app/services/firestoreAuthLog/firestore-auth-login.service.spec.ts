import { TestBed } from '@angular/core/testing';

import { FirestoreLoginService } from './firestore-auth-login.service';

describe('FirestoreLoginService', () => {
  let service: FirestoreLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
