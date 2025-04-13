import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ActionFavorite } from 'enum/options.enum';

@InputType()
export class ActionFavoriteDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idFavorite: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idProduct: string;

  @Field(() => ActionFavorite)
  @IsNotEmpty()
  @IsEnum(ActionFavorite)
  action: ActionFavorite;
}
