import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Category } from '../category/category.entity';



@Injectable()
export class TasksService {

    private logger = new Logger('TaskService')

    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {

        const query = this.taskRepository.createQueryBuilder("task")

        query.where('task.userId = :userId', { userId: user.id })

        const { status, search } = filterDto

        if (status) {

            query.andWhere('task.status = :status', { status })
        }

        if (search) {

            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` })

        }

        try {

            const tasks = await query.getMany();
            return tasks
        } catch (error) {

            this.logger.error(`Failed to get tasks for user '${user.username}, Filters: ${JSON.stringify(filterDto)}'`, error.stack)

            throw new InternalServerErrorException()
        }
    }

    async createTask(createTaskDto: CreateTaskDto, userData: User): Promise<Partial<Task>> {

        console.log("service", createTaskDto)

        const { title, description, categoryType } = createTaskDto;
        const task = new Task()

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = userData

        let get_category = await this.categoryRepository.findOne({where: {category: categoryType}})
        console.log("hiii",get_category)
        if(!get_category){
            get_category = new Category()
            get_category.category = categoryType
            get_category.users = [userData]

            await this.categoryRepository.save(get_category)
        }else{
            if(!get_category.users){
                get_category.users = [userData]
            }else{
                get_category.users.push(userData)
            }

            await this.categoryRepository.save(get_category)
        }
        try {
            task.category = get_category
            await this.taskRepository.save(task)
        } catch (error) {
            this.logger.error(`Failed to create a task for user '${userData.username}', Data: ${createTaskDto}`, error.stack)

            throw new InternalServerErrorException()
        }

        const { user, category, ...rest } = task
        return rest
    }

    async getTaskById(id: number, user: User): Promise<Task> {

        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException("Task does not found")
        }

        return found;
    }


    async deleteTask(id: number, user: User): Promise<void> {

        const result = await this.taskRepository.delete({ id, userId: user.id });

        if (result.affected === 0) {
            throw new NotFoundException("Task does not found")
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {

        const task = await this.getTaskById(id, user)

        if (!task) {
            throw new NotFoundException("Task does not found")
        }
        task.status = status;
        await task.save()
        return task
    }

    // async getCategories() :Promise<Category[]> {

    //     // const categories = await this.categoryRepository.find();

    //     // return categories
    // }
}
