import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteFeatbacktDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idFeedback: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idUser: string;
}
