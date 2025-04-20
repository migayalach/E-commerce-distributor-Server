import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignResolver } from './sign.resolver';
import { UserModule } from 'src/user/user.module';
import { LevelModule } from 'src/level/level.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    UserModule,
    LevelModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [SignResolver, SignService],
})
export class SignModule {}
