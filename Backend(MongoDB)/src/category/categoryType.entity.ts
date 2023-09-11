import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "./category.entity";

export type CategoryTypeDocument = HydratedDocument<CategoryType>

@Schema()
export class CategoryType {
    
    @Prop()
    category: string;

    @Prop()
    uuid: string;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Category'}]})
    CategoryData: Category
}

export const CategoryTypeSchema = SchemaFactory.createForClass(CategoryType)