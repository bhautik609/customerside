import { TestBed } from '@angular/core/testing';

import { CancleorderService } from './cancleorder.service';

describe('CancleorderService', () => {
  let service: CancleorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancleorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
