/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Category } from '../category/category.entity';
import { Model, ObjectId } from 'mongoose';
export declare class TasksService {
    private taskModel;
    private categoryModel;
    private userModel;
    private logger;
    constructor(taskModel: Model<Task>, categoryModel: Model<Category>, userModel: Model<User>);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<(import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createTask(createTaskDto: CreateTaskDto, userData: User): Promise<void>;
    deleteTask(id: ObjectId, user: User): Promise<void>;
    updateTaskStatus(id: ObjectId, status: TaskStatus): Promise<Task>;
}
