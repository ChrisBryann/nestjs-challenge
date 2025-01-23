import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { TaskSchema } from "./task.schema";

@Schema({
    timestamps: true, // enables createdAt and updatedAt fields
})
export class Project {
    @Prop({
        type: SchemaTypes.ObjectId,
        auto: true
    })
    _id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);