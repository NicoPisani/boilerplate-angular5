import { TestBed, inject } from '@angular/core/testing';

import { RequestsService } from './requests.service';
import { HttpModule } from '@angular/http';

describe('RequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestsService],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([RequestsService], (service: RequestsService) => {
    expect(service).toBeTruthy();
  }));
});
