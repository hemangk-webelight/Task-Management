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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTypeSchema = exports.CategoryType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_entity_1 = require("./category.entity");
let CategoryType = class CategoryType {
};
exports.CategoryType = CategoryType;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CategoryType.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CategoryType.prototype, "uuid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Category' }] }),
    __metadata("design:type", category_entity_1.Category)
], CategoryType.prototype, "CategoryData", void 0);
exports.CategoryType = CategoryType = __decorate([
    (0, mongoose_1.Schema)()
], CategoryType);
exports.CategoryTypeSchema = mongoose_1.SchemaFactory.createForClass(CategoryType);
//# sourceMappingURL=categoryType.entity.js.map