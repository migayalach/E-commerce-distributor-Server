import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { CategoryModule } from 'src/category/category.module';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';
import { FeatbackModule } from 'src/featback/featback.module';
import { QualificationModule } from 'src/qualification/qualification.module';

@Module({
  imports: [
    CategoryModule,
    EmailModule,
    UserModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    forwardRef(() => FeatbackModule),
    forwardRef(() => QualificationModule),
  ],
  exports: [ProductsService],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
