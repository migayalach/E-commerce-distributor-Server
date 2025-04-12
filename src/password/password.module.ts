import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordResolver } from './password.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [PasswordResolver, PasswordService],
})
export class PasswordModule {}
