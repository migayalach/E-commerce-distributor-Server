import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class SignInDto {
  @Field({ nullable: false })
  @MinLength(5, { message: '' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: false })
  @MinLength(8, { message: '' })
  @IsNotEmpty()
  password: string;
}

@InputType()
export class SignUpDto {
  @Field({ nullable: false })
  @MinLength(3, { message: '' })
  @IsNotEmpty()
  name: string;

  @Field({ nullable: false })
  @MinLength(3, { message: '' })
  @IsNotEmpty()
  lastName: string;

  @Field({ nullable: false })
  @MinLength(5, { message: '' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: false })
  @MinLength(0, { message: '' })
  @MaxLength(15, { message: '' })
  @IsNotEmpty()
  carnet: string;

  @Field({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @Field({ nullable: false })
  @MinLength(8, { message: '' })
  @IsNotEmpty()
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  profilePicture?: string;
}
