import { TestBed } from '@angular/core/testing';

import { DynamicNotificationService } from './dynamic-notification.service';

describe('DynamicNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicNotificationService = TestBed.get(DynamicNotificationService);
    expect(service).toBeTruthy();
  });
});
