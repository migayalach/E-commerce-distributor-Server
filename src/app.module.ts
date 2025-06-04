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
import { CartModule } from './cart/cart.module';
import { BuyModule } from './buy/buy.module';
import { DetailModule } from './detail/detail.module';
import { SignModule } from './sign/sign.module';
import { EmailModule } from './email/email.module';
import { FiltersModule } from './filters/filters.module';

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
      introspection: true, //VIEW PLAYGROUND
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    }),
    SubscribeModule,
    CategoryModule,
    LevelModule,
    ProductsModule,
    UserModule,
    PasswordModule,
    FavoriteModule,
    CartModule,
    BuyModule,
    DetailModule,
    SignModule,
    EmailModule,
    FiltersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
