import { Test, TestingModule } from '@nestjs/testing';
import { SignResolver } from './sign.resolver';
import { SignService } from './sign.service';

describe('SignResolver', () => {
  let resolver: SignResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignResolver, SignService],
    }).compile();

    resolver = module.get<SignResolver>(SignResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
