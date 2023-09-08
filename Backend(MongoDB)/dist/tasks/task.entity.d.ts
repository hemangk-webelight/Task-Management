import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";
import { Category } from "src/category/category.entity";
import mongoose, { HydratedDocument } from "mongoose";
export type TaskDocument = HydratedDocument<Task>;
export declare class Task {
    title: string;
    description: string;
    status: TaskStatus;
    user: User;
    category: Category;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, mongoose.Document<unknown, any, Task> & Task & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Task, mongoose.Document<unknown, {}, Task> & Task & {
    _id: mongoose.Types.ObjectId;
}>;
