import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBuyDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty({ message: 'Please enter your user identification.' })
  idUser: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty({
    message: 'Please enter your identification to access your cart.',
  })
  idCart: string;
}
