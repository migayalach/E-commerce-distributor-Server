import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field({ nullable: false })
  @MinLength(0, {
    message: 'Plase introduce a more descriptive name-category.',
  })
  @IsNotEmpty({ message: 'Please introduce a name-category.' })
  nameCategory: string;
}
