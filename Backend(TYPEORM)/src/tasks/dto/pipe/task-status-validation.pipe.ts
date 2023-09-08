import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "src/tasks/task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any, metadata: ArgumentMetadata) {

        value = value.toUpperCase();

        if (!this.isValildStatus(value)) {
            throw new BadRequestException("Please Provide valid status value")
        }

        return value;
    }

    private isValildStatus(status: any) {

        const idx = this.allowedStatus.indexOf(status);

        return idx !== -1;
    }
}