import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
export declare class TasksController {
    private tasksService;
    private logger;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GetTasksFilterDto, user: User, res: Response): Promise<Response>;
    createTask(createTaskDto: CreateTaskDto, user: User, res: Response): Promise<Response>;
    deleteTask(id: ObjectId, user: User, res: Response): Promise<Response>;
    updateTaskStatus(id: ObjectId, status: TaskStatus, user: User, res: Response): Promise<Response>;
}
