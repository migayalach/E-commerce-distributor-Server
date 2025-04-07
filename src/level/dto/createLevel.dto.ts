import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateLevelDto {
  @Field({ nullable: false })
  @MinLength(0, {
    message: 'Plase introduce a more descriptive name-level.',
  })
  @IsNotEmpty({ message: 'Please introduce a name-level.' })
  nameLevel: string;
}
