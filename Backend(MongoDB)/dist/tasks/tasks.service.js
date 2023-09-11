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
const uuid_1 = require("uuid");
const task_status_enum_1 = require("./task-status.enum");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TasksService = class TasksService {
    constructor(taskModel, categoryModel, userModel) {
        this.taskModel = taskModel;
        this.categoryModel = categoryModel;
        this.userModel = userModel;
        this.logger = new common_1.Logger('TaskService');
    }
    async getTasks(filterDto, user) {
        try {
            let tasks = this.taskModel.find({ user: user });
            const { status, search, category } = filterDto;
            if (status) {
                tasks = this.taskModel.find({ status, user: user });
            }
            if (search) {
                tasks = this.taskModel.find({
                    $or: [{
                            title: { '$regex': search, '$options': 'i' }
                        },
                        { desription: { '$regex': search, '$options': 'i' } },
                        { status: { '$regex': search, '$options': 'i' } }],
                    user: user
                });
            }
            if (category) {
                const get_category = await this.categoryModel.findOne({ category });
                if (!get_category) {
                    throw new common_1.NotFoundException("task with this category doesn't found");
                }
                else {
                    let task = await this.taskModel.find({ categoryUUID: get_category.uuid, user });
                    return task;
                }
            }
            return tasks;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for user '${user.username}, Filters: ${JSON.stringify(filterDto)}'`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async createTask(createTaskDto, userData) {
        const { title, description, categoryType } = createTaskDto;
        const id = (0, uuid_1.v4)();
        const task = new this.taskModel();
        task.title = title;
        task.description = description;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        task.user = userData;
        let user = await this.userModel.findOne({ username: userData.username });
        if (!user) {
            throw new common_1.UnauthorizedException("Your are not authorized");
        }
        let get_category = await this.categoryModel.findOne({ category: categoryType });
        if (!get_category) {
            get_category = new this.categoryModel();
            get_category.category = categoryType;
            get_category.uuid = id;
            get_category.tasks = [task];
            await get_category.save();
            task.category = get_category;
            task.categoryUUID = id;
            await task.save();
            user.tasks.push(task);
            await user.save();
        }
        else {
            get_category.tasks.push(task);
            await get_category.save();
            task.category = get_category;
            task.categoryUUID = get_category.uuid;
            await task.save();
            user.tasks.push(task);
            await user.save();
        }
    }
    async deleteTask(id, user) {
        const removeFromCategory = await this.categoryModel.updateMany({ tasks: id }, { $pull: { tasks: id } });
        console.log("category", removeFromCategory);
        const removeFromUser = await this.userModel.updateMany({ tasks: id }, { $pull: { tasks: id } });
        console.log("category", removeFromUser);
        const result = await this.taskModel.findByIdAndDelete({ _id: id, user: user });
        if (result === null || !result) {
            throw new common_1.NotFoundException("Task does not found");
        }
    }
    async updateTaskStatus(id, status) {
        const task = await this.taskModel.findByIdAndUpdate({ _id: id }, { $set: { status } });
        if (!task) {
            throw new common_1.NotFoundException("Task does not found");
        }
        await task.save();
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Task')),
    __param(1, (0, mongoose_1.InjectModel)('Category')),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TasksService);
//# sourceMappingURL=tasks.service.js.map