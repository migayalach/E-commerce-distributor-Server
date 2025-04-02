import { Resolver } from '@nestjs/graphql';
import { LevelService } from './level.service';

@Resolver()
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}
}
