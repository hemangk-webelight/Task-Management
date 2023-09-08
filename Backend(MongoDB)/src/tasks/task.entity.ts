import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";
import { Category } from "src/category/category.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { timeStamp } from "console";

export type TaskDocument = HydratedDocument<Task> 

@Schema({timestamps: true})
export class Task {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    status: TaskStatus

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    user: User

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Category'})
    category: Category


}

export const TaskSchema = SchemaFactory.createForClass(Task)