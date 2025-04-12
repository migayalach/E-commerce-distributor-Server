import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SubscribeModule } from './subscribe/subscribe.module';
import { CategoryModule } from './category/category.module';
import { LevelModule } from './level/level.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(
      process.env.DATABASE_DEPLOY ||
        process.env.DATABASE_DOCKER ||
        'mongodb://localhost/distributor',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
    }),
    SubscribeModule,
    CategoryModule,
    LevelModule,
    ProductsModule,
    UserModule,
    PasswordModule,
    FavoriteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
