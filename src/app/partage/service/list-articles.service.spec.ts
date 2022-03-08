import { TestBed } from '@angular/core/testing';

import { ListArticlesService } from './list-articles.service';

describe('ListArticlesService', () => {
  let service: ListArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
