import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Logger, 
    Param, 
    Patch, 
    Post, 
    Query, 
    Res, 
    UseGuards,  
    ValidationPipe 
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/task-filter.dto';
import { TaskStatusValidationPipe } from './dto/pipe/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Response } from 'express';
import { CategoryPipe } from 'src/category/pipe/category-validate.pipe';
import { ObjectId } from 'mongoose';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    private logger = new Logger('TasksController')
    constructor(private tasksService: TasksService) { }

    @Get()
    async getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User,
        @Res() res: Response
    ): Promise<Response> {

        this.logger.verbose(`user ${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`)
        const tasks = await this.tasksService.getTasks(filterDto, user)

        if(!tasks.length){
            return res.status(404).json({
                message: "Task does not found",
                data: []
            })
        }

        return res.status(200).json({
            message: "All tasks fetched successfully",
            data: tasks
        })
    }

    @Post()
    async createTask(
        @Body(CategoryPipe) createTaskDto: CreateTaskDto,
        @GetUser() user: User,
        @Res() res: Response
    ): Promise<Response> {

        this.logger.verbose(`User ${user.username} is creating a task. Data: ${JSON.stringify(createTaskDto)}`)
        const task = await this.tasksService.createTask(createTaskDto, user)

        return res.status(201).json({
            message: " Task is successfully created"
        })
    }

    @Delete("/:id")
    async deleteTask(
        @Param("id") id: ObjectId, 
        @GetUser() user: User, 
        @Res() res: Response
        ): Promise<Response> {

        await this.tasksService.deleteTask(id, user)

        return res.status(200).json({
            message: "Task is successfully deleted"
        })
    }

    @Patch("/:id/status")
    async updateTaskStatus(
        @Param("id") id: ObjectId, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus, 
        @GetUser() user: User, 
        @Res() res: Response
        ): Promise<Response> {
  
        const updated_task = await this.tasksService.updateTaskStatus(id, status)

        return res.status(200).json({
            message: "Task is successfully updated",
            data: updated_task
        })
    }

}
