import { Category } from "./category.entity";
import { Repository } from "typeorm";
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    getAllTaskDataByCategory(id: number): Promise<{
        id: number;
        username: string;
        tasks: import("../tasks/task.entity").Task[];
        category: Category;
    }[]>;
}
