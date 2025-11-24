import { Field, InputType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';

@InputType()
export class BuyInputFilterDto {
  @Field(() => Date, { nullable: false })
  @IsDate({ message: 'Please introduce date to Start' })
  dateToStart: Date;

  @Field(() => Date, { nullable: false })
  @IsDate({ message: 'Please introduce date to End' })
  dateToEnd: Date;
}
