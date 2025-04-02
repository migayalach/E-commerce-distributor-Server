import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeResolver } from './subscribe.resolver';
import { SubscribeService } from './subscribe.service';

describe('SubscribeResolver', () => {
  let resolver: SubscribeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribeResolver, SubscribeService],
    }).compile();

    resolver = module.get<SubscribeResolver>(SubscribeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
