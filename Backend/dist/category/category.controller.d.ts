import { CategoryService } from "./category.service";
import { Response } from "express";
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getCategories(res: Response): Promise<Response>;
    getTaskByCategory(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
