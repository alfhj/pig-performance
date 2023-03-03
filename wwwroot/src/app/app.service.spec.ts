import { TestBed } from '@angular/core/testing';

import { PigService } from './app.service';

describe('AppService', () => {
  let service: PigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
