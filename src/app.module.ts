import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SubscribeModule } from './subscribe/subscribe.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { LevelModule } from './level/level.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_LOCAL || 'mongodb://localhost/distributor',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
    }),
    SubscribeModule,
    CategoryModule,
    ProductsModule,
    LevelModule,
    UserModule,
    FavoriteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
