import { TestBed, inject } from '@angular/core/testing';

import { ProjectFilterDataService } from './project-filter-data.service';

describe('ProjectFilterDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectFilterDataService]
    });
  });

  it('should be created', inject([ProjectFilterDataService], (service: ProjectFilterDataService) => {
    expect(service).toBeTruthy();
  }));
});
