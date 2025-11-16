import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { CategoryModule } from 'src/category/category.module';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';
import { FeatbackModule } from 'src/featback/featback.module';

@Module({
  imports: [
    CategoryModule,
    EmailModule,
    UserModule,
    FeatbackModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  exports: [ProductsService],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
