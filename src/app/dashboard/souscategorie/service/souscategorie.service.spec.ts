import { TestBed } from '@angular/core/testing';

import { SouscategorieService } from './souscategorie.service';

describe('SouscategorieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SouscategorieService = TestBed.get(SouscategorieService);
    expect(service).toBeTruthy();
  });
});
