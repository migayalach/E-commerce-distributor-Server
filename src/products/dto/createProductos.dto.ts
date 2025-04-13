import { InputType, Field, ID } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idCategory: string;

  @Field()
  @IsString()
  @MinLength(0, { message: 'The product name cannot be empty.' })
  nameProduct: string;

  @Field()
  @IsNumber()
  @Min(0, { message: 'The price cannot be less than 0.' })
  price: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  imageProduct: string;

  @Field()
  @IsNumber()
  @Min(0, { message: 'The stock cannot be less than 0.' })
  stock: number;
}
