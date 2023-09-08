import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskCategory } from "../category.enum";

export class CategoryPipe implements PipeTransform {
    
    readonly allowedCategory = [
        TaskCategory.REACTJS,
        TaskCategory.NEXTJS,
        TaskCategory.NODEJS,
        TaskCategory.EXPRESSJS,
        TaskCategory.NESTJS
    ] 

    transform(value: any, metadata: ArgumentMetadata) {
        
        let { categoryType } = value

        categoryType = categoryType.toUpperCase()

        if(!this.isValidCategory(categoryType)){
            throw new BadRequestException("Please provide valid category")
        }
        value = {
            ...value,
            categoryType
        }
         return value;
    }

    private isValidCategory(category) {

        const idx = this.allowedCategory.indexOf(category)

        return idx !== -1;
    }
}