import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ActionAddUpdate } from 'enum/options.enum';

@InputType()
export class ActionCartDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idCart: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idProduct: string;

  @Field(() => ActionAddUpdate)
  @IsNotEmpty()
  @IsEnum(ActionAddUpdate)
  action: ActionAddUpdate;

  @Field()
  @IsNumber()
  @Min(0, { message: 'Please enter a quantity' })
  amount: number;
}
