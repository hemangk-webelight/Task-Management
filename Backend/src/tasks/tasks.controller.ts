import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/task-filter.dto';
import { TaskStatusValidationPipe } from './dto/pipe/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Response } from 'express';

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
                message: "Task does not found"
            })
        }

        return res.status(200).json({
            message: "All tasks fetched successfully",
            data: tasks
        })
    }

    @Post()
    async createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
        @Res() res: Response
    ): Promise<Response> {
        
        console.log("controller",createTaskDto)

        this.logger.verbose(`User ${user.username} is creating a task. Data: ${JSON.stringify(createTaskDto)}`)
        const task = await this.tasksService.createTask(createTaskDto, user)

        return res.status(201).json({
            message: " Task is successfully created",
            data: task
        })
    }

    @Get("/:id")
    async getTaskById(
        @Param("id", ParseIntPipe) id: number, 
        @GetUser() user: User, 
        @Res() res: Response
        ): Promise<Response> {

        const task = await this.tasksService.getTaskById(id, user)

        return res.status(200).json({
            message: "Task successfully fetched",
            data: task
        })
    }

    @Delete("/:id")
    async deleteTask(
        @Param("id", ParseIntPipe) id: number, 
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
        @Param("id", ParseIntPipe) id: number, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus, 
        @GetUser() user: User, 
        @Res() res: Response
        ): Promise<Response> {
         console.log(status)   
        const updated_task = await this.tasksService.updateTaskStatus(id, status, user)

        return res.status(200).json({
            message: "Task is successfully updated",
            data: updated_task
        })
    }
}
