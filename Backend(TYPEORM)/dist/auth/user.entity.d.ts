import { Category } from "src/category/category.entity";
import { Task } from "src/tasks/task.entity";
import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    salt: string;
    tasks: Task[];
    category: Category;
}
