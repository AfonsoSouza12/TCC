import { TestBed } from '@angular/core/testing';

import { SubEtapaService } from './sub-etapa.service';

describe('SubEtapaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubEtapaService = TestBed.get(SubEtapaService);
    expect(service).toBeTruthy();
  });
});
