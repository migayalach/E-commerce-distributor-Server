import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subscribe,
  SubscribeSchema,
} from 'src/subscribe/schema/subscribe.schema';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import { Product, ProductSchema } from 'src/products/schema/product.schema';
import { Level, LevelSchema } from 'src/level/schema/level.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_DOCKER || 'mongodb://localhost/distributor',
    ),
    MongooseModule.forFeature([
      { name: Subscribe.name, schema: SubscribeSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Level.name, schema: LevelSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [SeedersService],
})
export class SeedersModule {}
