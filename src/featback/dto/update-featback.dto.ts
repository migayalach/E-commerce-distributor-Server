import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ActionComplete } from 'enum/options.enum';

@InputType()
export class FeatbacktDto {
  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  idFeatback: string;

  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  idProduct: string;

  @Field()
  @IsNotEmpty({ message: 'The featback content cannot be empty.' })
  @IsString()
  featback: string;

  @Field(() => ActionComplete)
  @IsNotEmpty()
  @IsEnum(ActionComplete)
  action: ActionComplete;
}
