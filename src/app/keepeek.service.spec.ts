import { TestBed, inject } from '@angular/core/testing';

import { KeepeekService } from './keepeek.service';

describe('KeepeekService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeepeekService]
    });
  });

  it('should be created', inject([KeepeekService], (service: KeepeekService) => {
    expect(service).toBeTruthy();
  }));
});
