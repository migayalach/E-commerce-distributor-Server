import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver';
import { UserModule } from 'src/user/user.module';
import { ProductModel } from 'src/products/models/product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './schema/favorite.schema';

@Module({
  imports: [
    UserModule,
    ProductModel,
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
  providers: [FavoriteResolver, FavoriteService],
})
export class FavoriteModule {}
