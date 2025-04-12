import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  _id: string;

  @Field({ nullable: false })
  @IsNotEmpty({ message: 'Please enter your old password.' })
  @MinLength(8)
  oldPassword: string;

  @Field({ nullable: false })
  @IsNotEmpty({ message: 'Please enter your new password' })
  @MinLength(8)
  newPassword: string;

  @Field({ nullable: false })
  @IsNotEmpty({ message: 'Please enter your new password' })
  @MinLength(8)
  repeatNewPassword: string;
}
