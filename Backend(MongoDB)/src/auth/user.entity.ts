import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "src/category/category.entity";
import { Task } from "src/tasks/task.entity";


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({unique: true})
    email: string;
    
    @Prop({unique: true})
    username: string;

    @Prop()
    password: string


    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
    tasks: Task[] 

    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    // category: Category
    
}

export const UserSchema = SchemaFactory.createForClass(User);