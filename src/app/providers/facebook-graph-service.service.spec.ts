import { TestBed, inject } from '@angular/core/testing';

import { FaceBookPostsService } from './facebook-graph-service.service';

describe('FaceBookPostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaceBookPostsService]
    });
  });

  it('should be created', inject([FaceBookPostsService], (service: FaceBookPostsService) => {
    expect(service).toBeTruthy();
  }));
});
