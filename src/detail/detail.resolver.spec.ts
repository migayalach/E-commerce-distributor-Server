import { Test, TestingModule } from '@nestjs/testing';
import { DetailResolver } from './detail.resolver';
import { DetailService } from './detail.service';

describe('DetailResolver', () => {
  let resolver: DetailResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailResolver, DetailService],
    }).compile();

    resolver = module.get<DetailResolver>(DetailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
