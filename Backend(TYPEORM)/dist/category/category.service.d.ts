import { Category } from "./category.entity";
import { Repository } from "typeorm";
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    getAllTaskDataByCategory(id: number): Promise<{
        category: string;
        id: number;
        username: string;
        tasks: import("../tasks/task.entity").Task[];
        title: string;
        description: string;
        status: import("../tasks/task-status.enum").TaskStatus;
        userId: number;
        categoryId: number;
    }[]>;
}
