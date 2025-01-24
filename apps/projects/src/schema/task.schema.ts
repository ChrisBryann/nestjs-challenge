import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Task {
    @Prop({
        type: SchemaTypes.ObjectId,
        ref: 'Project'
    })
    _id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);