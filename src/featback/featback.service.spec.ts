import { Test, TestingModule } from '@nestjs/testing';
import { FeatbackService } from './featback.service';

describe('FeatbackService', () => {
  let service: FeatbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatbackService],
    }).compile();

    service = module.get<FeatbackService>(FeatbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
