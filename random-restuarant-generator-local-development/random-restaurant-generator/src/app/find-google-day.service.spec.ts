import { TestBed } from '@angular/core/testing';

import { FindGoogleDayService } from './find-google-day.service';

describe('FindGoogleDayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindGoogleDayService = TestBed.get(FindGoogleDayService);
    expect(service).toBeTruthy();
  });
});
