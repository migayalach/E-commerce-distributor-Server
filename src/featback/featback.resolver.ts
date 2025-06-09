import { Resolver } from '@nestjs/graphql';
import { FeatbackService } from './featback.service';

@Resolver('Featback')
export class FeatbackResolver {
  constructor(private readonly featbackService: FeatbackService) {}
}
