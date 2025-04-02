import { Module } from '@nestjs/common';
import { SubscribeModule } from './subscribe/subscribe.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { LevelModule } from './level/level.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [SubscribeModule, CategoryModule, ProductsModule, LevelModule, UserModule, FavoriteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
