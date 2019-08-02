import { TestBed } from '@angular/core/testing';

import { AuthGardComService } from './auth-gard-com.service';

describe('AuthGardComService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGardComService = TestBed.get(AuthGardComService);
    expect(service).toBeTruthy();
  });
});
