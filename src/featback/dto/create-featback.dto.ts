import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AddFeatbacktDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idFeedback: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idUser: string;

  @Field({ nullable: true })
  @IsString()
  featback?: string;
}
