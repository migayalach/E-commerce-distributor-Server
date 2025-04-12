import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFavoriteDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idUser: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idProduct: string;
}
