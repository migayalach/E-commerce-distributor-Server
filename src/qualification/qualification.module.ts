import { forwardRef, Module } from '@nestjs/common';
import { QualificationService } from './qualification.service';
import { QualificationResolver } from './qualification.resolver';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Qualification,
  QualificationSchema,
} from 'src/products/schema/qualification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Qualification.name, schema: QualificationSchema },
    ]),
    UserModule,
    forwardRef(() => ProductsModule),
  ],
  exports: [QualificationService],
  providers: [QualificationResolver, QualificationService],
})
export class QualificationModule {}
