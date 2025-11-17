import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteQualificationDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idQualification: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idUser: string;
}
