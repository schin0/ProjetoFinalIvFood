import { TestBed } from '@angular/core/testing';

import { ReceitasDadosService } from './receitas-dados.service';

describe('ReceitasDadosService', () => {
  let service: ReceitasDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceitasDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
