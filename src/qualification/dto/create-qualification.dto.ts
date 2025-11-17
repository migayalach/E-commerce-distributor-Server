import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

@InputType()
export class AddQualificationDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idQualification: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idUser: string;

  @Field({ nullable: false })
  @IsNumber()
  @Min(1, { message: 'The minimum value is 1.' })
  @Max(5, { message: 'The maximum value is 5.' })
  value: number;
}
