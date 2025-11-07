import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ActionComplete } from 'enum/options.enum';

@InputType()
export class QualificationDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idUser: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idProduct: string;

  @Field()
  @IsNumber()
  @Min(0, { message: 'The qualification cannot be less than 0.' })
  @Max(5, { message: 'The qualification cannot be greater than 5.' })
  qualification: number;

  @Field(() => ActionComplete)
  @IsNotEmpty()
  @IsEnum(ActionComplete)
  action: ActionComplete;
}
