import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { SignModule } from 'src/sign/sign.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    SignModule,
  ],
  exports: [CategoryService],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
