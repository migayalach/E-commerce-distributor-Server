import { forwardRef, Module } from '@nestjs/common';
import { FeatbackService } from './featback.service';
import { FeatbackResolver } from './featback.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Featback, FeatbackSchema } from 'src/products/schema/featback.schema';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Featback.name, schema: FeatbackSchema },
    ]),
    UserModule,
    forwardRef(() => ProductsModule),
  ],
  exports: [FeatbackService],
  providers: [FeatbackResolver, FeatbackService],
})
export class FeatbackModule {}
