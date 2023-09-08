"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPipe = void 0;
const common_1 = require("@nestjs/common");
const category_enum_1 = require("../category.enum");
class CategoryPipe {
    constructor() {
        this.allowedCategory = [
            category_enum_1.TaskCategory.REACTJS,
            category_enum_1.TaskCategory.NEXTJS,
            category_enum_1.TaskCategory.NODEJS,
            category_enum_1.TaskCategory.EXPRESSJS,
            category_enum_1.TaskCategory.NESTJS
        ];
    }
    transform(value, metadata) {
        let { categoryType } = value;
        categoryType = categoryType.toUpperCase();
        if (!this.isValidCategory(categoryType)) {
            throw new common_1.BadRequestException("Please provide valid category");
        }
        value = {
            ...value,
            categoryType
        };
        return value;
    }
    isValidCategory(category) {
        const idx = this.allowedCategory.indexOf(category);
        return idx !== -1;
    }
}
exports.CategoryPipe = CategoryPipe;
//# sourceMappingURL=category-validate.pipe.js.map