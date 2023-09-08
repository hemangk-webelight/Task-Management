import { CategoryService } from "./category.service";
import { Response } from "express";
import { ObjectId } from "mongoose";
import { TaskCategory } from "./category.enum";
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getTaskByCategory(id: ObjectId, res: Response): Promise<Response<any, Record<string, any>>>;
    taskBycategoryFilter(category: TaskCategory, res: Response): Promise<void>;
}
