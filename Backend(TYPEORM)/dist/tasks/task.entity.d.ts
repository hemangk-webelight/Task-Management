import { BaseEntity } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";
import { Category } from "src/category/category.entity";
export declare class Task extends BaseEntity {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    user: User;
    userId: number;
    category: Category;
    categoryId: number;
}
