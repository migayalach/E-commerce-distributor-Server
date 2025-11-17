import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class QualificationDetail {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  idUser: Types.ObjectId;

  @Prop({ required: true, default: false })
  enableQualification: boolean;

  @Prop({ required: false, default: 0 })
  value: number;
}
export const QualificationDetailSchema =
  SchemaFactory.createForClass(QualificationDetail);

@Schema()
export class Qualification {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  idProduct: Types.ObjectId;

  @Prop({ required: false, default: 0 })
  qualification: number;

  @Prop({ types: [QualificationDetailSchema], default: [] })
  listQualification: QualificationDetail[];
}
export const QualificationSchema = SchemaFactory.createForClass(Qualification);
