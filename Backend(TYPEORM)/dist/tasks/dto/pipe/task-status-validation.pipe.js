"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("../../task-status.enum");
class TaskStatusValidationPipe {
    constructor() {
        this.allowedStatus = [
            task_status_enum_1.TaskStatus.OPEN,
            task_status_enum_1.TaskStatus.IN_PROGRESS,
            task_status_enum_1.TaskStatus.DONE
        ];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isValildStatus(value)) {
            throw new common_1.BadRequestException("Please Provide valid status value");
        }
        return value;
    }
    isValildStatus(status) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=task-status-validation.pipe.js.map