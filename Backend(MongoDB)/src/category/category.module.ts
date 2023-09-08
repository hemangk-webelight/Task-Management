import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { Category, CategorySchema } from "./category.entity";
import { MongooseModule } from '@nestjs/mongoose' 
@Module({
    imports: [
      // TypeOrmModule.forFeature([Category]),
      MongooseModule.forFeature([{name: 'Category', schema: CategorySchema}])
    ],
    controllers: [CategoryController],
    providers: [CategoryService]
  })
  export class CategoryModule { }