import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateCategoryDto } from './createCategory.dto';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty({ message: 'The category ID is required.' })
  idCategory: string;
}
