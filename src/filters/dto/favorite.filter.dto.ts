import { Field, InputType } from '@nestjs/graphql';
import { LowHighPrice } from 'enum/options.enum';

@InputType()
export class FavoriteInputFilterDto {
  @Field({ nullable: true })
  orderProductByPrice?: LowHighPrice;
}
