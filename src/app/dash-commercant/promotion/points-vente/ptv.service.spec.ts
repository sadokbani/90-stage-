import { TestBed } from '@angular/core/testing';

import { PtvService } from './ptv.service';

describe('PtvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PtvService = TestBed.get(PtvService);
    expect(service).toBeTruthy();
  });
});
