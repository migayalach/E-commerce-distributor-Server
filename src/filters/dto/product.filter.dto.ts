import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';
import { OrderName, LowHighPrice } from 'enum/options.enum';

@InputType()
export class ProductInputFilterDto {
  @Field({ nullable: true })
  orderProductByName?: OrderName;

  @Field({ nullable: true })
  @IsBoolean()
  orderProductByState?: boolean;

  @Field({ nullable: true })
  orderProductByPrice?: LowHighPrice;

  @Field({ nullable: true })
  orderProductByStars?: LowHighPrice;
}
