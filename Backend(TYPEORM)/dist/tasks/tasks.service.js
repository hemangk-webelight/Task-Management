"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./task.entity");
const task_status_enum_1 = require("./task-status.enum");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../category/category.entity");
let TasksService = class TasksService {
    constructor(taskRepository, categoryRepository) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
        this.logger = new common_1.Logger('TaskService');
    }
    async getTasks(filterDto, user) {
        const query = this.taskRepository.createQueryBuilder("task");
        query.where('task.userId = :userId', { userId: user.id });
        const { status, search } = filterDto;
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` });
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for user '${user.username}, Filters: ${JSON.stringify(filterDto)}'`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async createTask(createTaskDto, userData) {
        const { title, description, categoryType } = createTaskDto;
        const task = new task_entity_1.Task();
        task.title = title;
        task.description = description;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        task.user = userData;
        let get_category = await this.categoryRepository.findOne({ where: { category: categoryType } });
        if (!get_category) {
            get_category = new category_entity_1.Category();
            get_category.category = categoryType;
            get_category.users = [userData];
            await this.categoryRepository.save(get_category);
        }
        else {
            if (!get_category.users) {
                get_category.users = [userData];
            }
            else {
                get_category.users.push(userData);
            }
            await this.categoryRepository.save(get_category);
        }
        try {
            task.category = get_category;
            await this.taskRepository.save(task);
        }
        catch (error) {
            this.logger.error(`Failed to create a task for user '${userData.username}', Data: ${createTaskDto}`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
        const { user, category, ...rest } = task;
        return rest;
    }
    async getTaskById(id, user) {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new common_1.NotFoundException("Task does not found");
        }
        return found;
    }
    async deleteTask(id, user) {
        const result = await this.taskRepository.delete({ id, userId: user.id });
        if (result.affected === 0) {
            throw new common_1.NotFoundException("Task does not found");
        }
    }
    async updateTaskStatus(id, status, user) {
        const task = await this.getTaskById(id, user);
        if (!task) {
            throw new common_1.NotFoundException("Task does not found");
        }
        task.status = status;
        await task.save();
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map