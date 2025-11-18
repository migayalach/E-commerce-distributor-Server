import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './schema/favorite.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
  exports: [FavoriteService],
  providers: [FavoriteResolver, FavoriteService],
})
export class FavoriteModule {}
