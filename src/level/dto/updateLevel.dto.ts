import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateLevelDto {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty({
    message: 'Please introduce an indentificatior for update the item.',
  })
  idLevel: string;

  @Field({ nullable: false })
  @MinLength(0, {
    message: 'Plase introduce a more descriptive name-level.',
  })
  @IsNotEmpty({ message: 'Please introduce a name-level.' })
  nameLevel: string;
}
