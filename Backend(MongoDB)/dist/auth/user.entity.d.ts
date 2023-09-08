import mongoose, { HydratedDocument } from "mongoose";
import { Task } from "src/tasks/task.entity";
export type UserDocument = HydratedDocument<User>;
export declare class User {
    email: string;
    username: string;
    password: string;
    tasks: Task[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, User> & User & {
    _id: mongoose.Types.ObjectId;
}>;
