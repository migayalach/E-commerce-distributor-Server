import { Test, TestingModule } from '@nestjs/testing';
import { FeatbackResolver } from './featback.resolver';
import { FeatbackService } from './featback.service';

describe('FeatbackResolver', () => {
  let resolver: FeatbackResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatbackResolver, FeatbackService],
    }).compile();

    resolver = module.get<FeatbackResolver>(FeatbackResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
