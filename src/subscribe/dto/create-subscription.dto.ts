import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSubscriptionDto {
  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'Please introduce a email' })
  email: string;
}
