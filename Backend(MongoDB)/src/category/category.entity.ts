import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/task.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>

@Schema()
export class Category{

    @Prop()
    category: string;

    // @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    // users: User[]

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Task'}]})
    tasks: Task[]
 
}

export const CategorySchema = SchemaFactory.createForClass(Category);