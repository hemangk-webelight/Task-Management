import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';


@Injectable()
export class TasksService {
   
    constructor(
        @InjectRepository(Task) 
        private taskRepository: Repository<Task>
        ){}

        async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
            
            const query = this.taskRepository.createQueryBuilder("task")

            const { status, search } = filterDto
            if(status){

                query.andWhere('task.status = :status', {status})
            }

            if(search){
                query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`})
            }
            const tasks = await query.getMany();
            return tasks
        }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        
        const { title, description } = createTaskDto;
        const task = new Task()
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save()
        
        return task
    }

    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne({where: {id}});

        if(!found){
            throw new NotFoundException("Task with this id does not found")
        }

        return found;
    }


    async deleteTask(id: number): Promise<void> {
        
        const result = await this.taskRepository.delete(id);
        
        if(result.affected === 0){
            throw new NotFoundException("Task with this id does not found")
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{

        const task = await this.taskRepository.findOne({where: {id}})

        if(!task){
            throw new NotFoundException("task with this id does not found")
        }
        task.status = status;
        await task.save()
        return task
    }

}