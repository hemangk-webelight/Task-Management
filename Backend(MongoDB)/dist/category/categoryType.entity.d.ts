import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "./category.entity";
export type CategoryTypeDocument = HydratedDocument<CategoryType>;
export declare class CategoryType {
    category: string;
    uuid: string;
    CategoryData: Category;
}
export declare const CategoryTypeSchema: mongoose.Schema<CategoryType, mongoose.Model<CategoryType, any, any, any, mongoose.Document<unknown, any, CategoryType> & CategoryType & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CategoryType, mongoose.Document<unknown, {}, CategoryType> & CategoryType & {
    _id: mongoose.Types.ObjectId;
}>;
