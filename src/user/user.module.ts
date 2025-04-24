import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { LevelModule } from 'src/level/level.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Favorite, FavoriteSchema } from 'src/favorite/schema/favorite.schema';
import { Cart, CartSchema } from 'src/cart/schema/cart.schema';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    LevelModule,
    EmailModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  exports: [UserService],
  providers: [UserResolver, UserService],
})
export class UserModule {}
