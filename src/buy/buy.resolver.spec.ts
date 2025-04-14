import { Test, TestingModule } from '@nestjs/testing';
import { BuyResolver } from './buy.resolver';
import { BuyService } from './buy.service';

describe('BuyResolver', () => {
  let resolver: BuyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyResolver, BuyService],
    }).compile();

    resolver = module.get<BuyResolver>(BuyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
