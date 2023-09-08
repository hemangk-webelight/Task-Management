import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "src/tasks/task-status.enum";
export declare class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus: TaskStatus[];
    transform(value: any, metadata: ArgumentMetadata): any;
    private isValildStatus;
}
