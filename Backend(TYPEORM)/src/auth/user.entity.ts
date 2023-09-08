import { Category } from "src/category/category.entity";
import { Task } from "src/tasks/task.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string

    @Column()
    salt: string

    @OneToMany(type => Task, task => task.user, { eager: false})
    tasks: Task[] 

    @ManyToOne(type => Category, category => category.users, { eager: false, nullable: true})
    category: Category
    
}