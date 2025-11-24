import { Field, InputType } from '@nestjs/graphql';
import { OrderName } from 'enum/options.enum';

@InputType()
export class UserInputFilterDto {
  @Field({ nullable: true })
  orderUserByName?: OrderName;

  @Field({ nullable: true })
  orderLevelByName?: OrderName;

  @Field({ nullable: true })
  findByCarnet?: string;
}
