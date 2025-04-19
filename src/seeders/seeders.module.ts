import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscribeModule } from 'src/subscribe/subscribe.module';
import { CategoryModule } from 'src/category/category.module';
import { ProductsModule } from 'src/products/products.module';
import { LevelModule } from 'src/level/level.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_DOCKER || 'mongodb://localhost/distributor',
    ),
    SubscribeModule,
    CategoryModule,
    ProductsModule,
    LevelModule,
    UserModule,
  ],
  providers: [SeedersService],
})
export class SeedersModule {}
