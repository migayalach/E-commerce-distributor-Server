import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ActionAddDelete } from 'enum/options.enum';

@InputType()
export class ActionCartDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idCart: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idProduct: string;

  @Field(() => ActionAddDelete)
  @IsNotEmpty()
  @IsEnum(ActionAddDelete)
  action: ActionAddDelete;
}
