import { Test, TestingModule } from '@nestjs/testing';
import { QuealificationResolver } from './quealification.resolver';
import { QuealificationService } from './quealification.service';

describe('QuealificationResolver', () => {
  let resolver: QuealificationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuealificationResolver, QuealificationService],
    }).compile();

    resolver = module.get<QuealificationResolver>(QuealificationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
