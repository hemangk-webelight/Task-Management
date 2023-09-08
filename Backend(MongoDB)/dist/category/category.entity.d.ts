import { Task } from "src/tasks/task.entity";
import mongoose, { HydratedDocument } from "mongoose";
export type CategoryDocument = HydratedDocument<Category>;
export declare class Category {
    category: string;
    tasks: Task[];
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, mongoose.Document<unknown, any, Category> & Category & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Category, mongoose.Document<unknown, {}, Category> & Category & {
    _id: mongoose.Types.ObjectId;
}>;
