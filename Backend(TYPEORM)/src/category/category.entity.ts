import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/task.entity";


@Entity('category')
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @OneToMany(type => User, user => user.category, { eager: true})
    users: User[]

    @OneToMany(type => Task, task => task.category, { eager: true})
    tasks: Task[]
 
}