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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const task_filter_dto_1 = require("./dto/task-filter.dto");
const task_status_validation_pipe_1 = require("./dto/pipe/task-status-validation.pipe");
const task_status_enum_1 = require("./task-status.enum");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../auth/user.entity");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const category_validate_pipe_1 = require("../category/pipe/category-validate.pipe");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
        this.logger = new common_1.Logger('TasksController');
    }
    async getTasks(filterDto, user, res) {
        this.logger.verbose(`user ${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
        const tasks = await this.tasksService.getTasks(filterDto, user);
        if (!tasks.length) {
            return res.status(404).json({
                message: "Task does not found",
                data: []
            });
        }
        return res.status(200).json({
            message: "All tasks fetched successfully",
            data: tasks
        });
    }
    async createTask(createTaskDto, user, res) {
        console.log("controller", createTaskDto);
        this.logger.verbose(`User ${user.username} is creating a task. Data: ${JSON.stringify(createTaskDto)}`);
        const task = await this.tasksService.createTask(createTaskDto, user);
        return res.status(201).json({
            message: " Task is successfully created",
            data: task
        });
    }
    async getTaskById(id, user, res) {
        const task = await this.tasksService.getTaskById(id, user);
        return res.status(200).json({
            message: "Task successfully fetched",
            data: task
        });
    }
    async deleteTask(id, user, res) {
        await this.tasksService.deleteTask(id, user);
        return res.status(200).json({
            message: "Task is successfully deleted"
        });
    }
    async updateTaskStatus(id, status, user, res) {
        console.log(status);
        const updated_task = await this.tasksService.updateTaskStatus(id, status, user);
        return res.status(200).json({
            message: "Task is successfully updated",
            data: updated_task
        });
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_filter_dto_1.GetTasksFilterDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(category_validate_pipe_1.CategoryPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Patch)("/:id/status"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status', task_status_validation_pipe_1.TaskStatusValidationPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTaskStatus", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map