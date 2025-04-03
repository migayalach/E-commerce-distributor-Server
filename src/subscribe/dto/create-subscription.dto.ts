import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubscriptionDto {
  @Field()
  email: string;
}
