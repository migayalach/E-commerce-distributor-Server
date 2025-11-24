import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersResolver } from './filters.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/schema/product.schema';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Level, LevelSchema } from 'src/level/schema/level.schema';
import { Buy, BuySchema } from 'src/buy/schema/buy.schema';
import { Detail, DetailSchema } from 'src/detail/schema/detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Buy.name, schema: BuySchema }]),
    MongooseModule.forFeature([{ name: Detail.name, schema: DetailSchema }]),
  ],

  providers: [FiltersResolver, FiltersService],
})
export class FiltersModule {}
