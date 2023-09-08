import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";
import { Category } from "src/category/category.entity";


@Entity('tasks')
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus

    @ManyToOne(type => User, user => user.tasks, { eager: true})
    user: User

    @Column()
    userId: number 

    @ManyToOne(type => Category, category => category.tasks, { eager: false})
    category: Category

    @Column()
    categoryId: number 

}