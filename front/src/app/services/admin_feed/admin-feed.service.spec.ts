import { TestBed } from '@angular/core/testing';

import { AdminFeedService } from './admin-feed.service';

describe('AdminFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminFeedService = TestBed.get(AdminFeedService);
    expect(service).toBeTruthy();
  });
});
