import { Resolver } from '@nestjs/graphql';
import { FavoriteService } from './favorite.service';

@Resolver()
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}
}
