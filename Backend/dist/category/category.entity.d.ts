import { BaseEntity } from "typeorm";
import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/task.entity";
export declare class Category extends BaseEntity {
    id: number;
    category: string;
    users: User[];
    tasks: Task[];
}
