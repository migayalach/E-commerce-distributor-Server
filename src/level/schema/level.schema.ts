import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Level extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, unique: true })
  @Field()
  nameLevel: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
