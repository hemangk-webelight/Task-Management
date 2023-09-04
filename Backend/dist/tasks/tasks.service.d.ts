import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
export declare class TasksService {
    private taskRepository;
    private logger;
    constructor(taskRepository: Repository<Task>);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto, userData: User): Promise<Partial<Task>>;
    getTaskById(id: number, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task>;
}
