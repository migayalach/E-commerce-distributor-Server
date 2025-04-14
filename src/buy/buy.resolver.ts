import { Resolver } from '@nestjs/graphql';
import { BuyService } from './buy.service';

@Resolver('Buy')
export class BuyResolver {
  constructor(private readonly buyService: BuyService) {}
}
