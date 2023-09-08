import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Category } from '../category/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';



@Injectable()
export class TasksService {

    private logger = new Logger('TaskService')

    constructor(
        @InjectModel('Task')
        private taskModel: Model<Task>,
        @InjectModel('Category')
        private categoryModel: Model<Category>,
        @InjectModel('User')
        private userModel: Model<User>
    ) { }

    async getTasks(filterDto: GetTasksFilterDto, user: User) {

        try {

            let tasks = this.taskModel.find({ user: user })

            const { status, search } = filterDto

            if (status) {
                tasks = this.taskModel.find({ status, user: user })
            }

            if (search) {

                tasks = this.taskModel.find({
                    $or: [{
                        title: { '$regex': search, '$options': 'i' }
                    },
                    { desription: { '$regex': search, '$options': 'i' } },
                    { status: { '$regex': search, '$options': 'i' } }],
                    user: user
                })
            }


            return tasks

        } catch (error) {

            this.logger.error(`Failed to get tasks for user '${user.username}, Filters: ${JSON.stringify(filterDto)}'`, error.stack)

            throw new InternalServerErrorException()
        }
    }

    async createTask(createTaskDto: CreateTaskDto, userData: User): Promise<void> {

        const { title, description, categoryType } = createTaskDto;


        const task = new this.taskModel()

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = userData

        let user = await this.userModel.findOne({ username: userData.username })
        
        if (!user) {
            throw new UnauthorizedException("Your are not authorized")
        }

        let get_category = await this.categoryModel.findOne({ category: categoryType })

        if (!get_category) {

            get_category = new this.categoryModel()
            get_category.category = categoryType
            // get_category.users = [userData]
            get_category.tasks = [task]

            await get_category.save()
            task.category = get_category
            await task.save();
            user.tasks.push(task)
            await user.save()

        } else {


            // const user_exist = await this.categoryModel.findOne({_id: get_category._id, users: userData})

            // if(!user_exist){


            //     // get_category.users.push(userData)
            //     get_category.tasks.push(task)

            //     await get_category.save()
            //     task.category = get_category
            //     await task.save()

            // }else{

            get_category.tasks.push(task)
            await get_category.save()
            task.category = get_category
            await task.save()
            user.tasks.push(task)
            await user.save()
        }

    }



    async deleteTask(id: ObjectId, user: User): Promise<void> {

        const result = await this.taskModel.findByIdAndDelete({ _id: id, user: user });

        if (result === null || !result) {
            throw new NotFoundException("Task does not found")
        }
    }

    async updateTaskStatus(id: ObjectId, status: TaskStatus): Promise<Task> {

        const task = await this.taskModel.findByIdAndUpdate({ _id: id }, { $set: { status } })

        if (!task) {
            throw new NotFoundException("Task does not found")
        }
        await task.save()
        return task
    }
}
