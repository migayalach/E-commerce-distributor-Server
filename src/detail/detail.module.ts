import { Module } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailResolver } from './detail.resolver';
import { ProductsModule } from 'src/products/products.module';
import { CartModule } from 'src/cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Detail, DetailSchema } from './schema/detail.schema';

@Module({
  imports: [
    ProductsModule,
    CartModule,
    MongooseModule.forFeature([{ name: Detail.name, schema: DetailSchema }]),
  ],
  exports: [DetailService],
  providers: [DetailResolver, DetailService],
})
export class DetailModule {}
