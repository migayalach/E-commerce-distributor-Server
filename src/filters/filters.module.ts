import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersResolver } from './filters.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/schema/product.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CategoryModule,
  ],
  providers: [FiltersResolver, FiltersService],
})
export class FiltersModule {}
