import { TestBed } from '@angular/core/testing';

import { EtapaService } from './etapa.service';

describe('EtapaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtapaService = TestBed.get(EtapaService);
    expect(service).toBeTruthy();
  });
});
