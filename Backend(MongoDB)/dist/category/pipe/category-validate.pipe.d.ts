import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { TaskCategory } from "../category.enum";
export declare class CategoryPipe implements PipeTransform {
    readonly allowedCategory: TaskCategory[];
    transform(value: any, metadata: ArgumentMetadata): any;
    private isValidCategory;
}
