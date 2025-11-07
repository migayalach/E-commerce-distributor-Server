import { Test, TestingModule } from '@nestjs/testing';
import { QualificationResolver } from './qualification.resolver';
import { QualificationService } from './qualification.service';

describe('QualificationResolver', () => {
  let resolver: QualificationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualificationResolver, QualificationService],
    }).compile();

    resolver = module.get<QualificationResolver>(QualificationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
