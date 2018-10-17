import { TestBed, inject } from '@angular/core/testing';

import { AgoraService } from './agora.service';

describe('AgoraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgoraService]
    });
  });

  it('should be created', inject([AgoraService], (service: AgoraService) => {
    expect(service).toBeTruthy();
  }));
});
