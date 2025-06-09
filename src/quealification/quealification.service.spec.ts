import { Test, TestingModule } from '@nestjs/testing';
import { QuealificationService } from './quealification.service';

describe('QuealificationService', () => {
  let service: QuealificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuealificationService],
    }).compile();

    service = module.get<QuealificationService>(QuealificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
