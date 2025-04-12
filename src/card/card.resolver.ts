import { Resolver } from '@nestjs/graphql';
import { CardService } from './card.service';

@Resolver('Card')
export class CardResolver {
  constructor(private readonly cardService: CardService) {}
}
