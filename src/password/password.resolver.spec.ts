import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResolver } from './password.resolver';
import { PasswordService } from './password.service';

describe('PasswordResolver', () => {
  let resolver: PasswordResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordResolver, PasswordService],
    }).compile();

    resolver = module.get<PasswordResolver>(PasswordResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
