import { TestBed } from '@angular/core/testing';

import { ArticleDetailResolverResolver } from './article-detail-resolver.resolver';

describe('ArticleDetailResolverResolver', () => {
  let resolver: ArticleDetailResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ArticleDetailResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
