import { Field, InputType } from '@nestjs/graphql';
import { LowHighPrice } from 'enum/options.enum';

@InputType()
export class CartInputFilterDto {
  @Field({ nullable: true })
  orderProductByPrice?: LowHighPrice;
}
