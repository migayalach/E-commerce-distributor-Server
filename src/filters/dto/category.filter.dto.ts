import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';
import { OrderName } from 'enum/options.enum';

@InputType()
export class CategoryInputFilterDto {
  @Field({ nullable: true })
  orderBy: OrderName;

  @Field({ nullable: true })
  @IsBoolean()
  stateCategory?: boolean;
}
