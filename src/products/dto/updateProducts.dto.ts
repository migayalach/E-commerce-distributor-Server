import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateProductDto } from './createProductos.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Field(() => ID)
  @IsNotEmpty()
  idProduct: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idCategory: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  state: boolean;
}
