import { Controller, Get, Param, Res } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Response } from "express";

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    @Get()
    async getCategories(@Res() res: Response): Promise<Response> {
        const categories = ["ReactJS", "ExpressJS", "NodeJS", "NestJS", "NextJS"]
        return res.status(200).json({message: "All categories fetched successfully", data: categories})
    }
    
    @Get("/:id")
    async getTaskByCategory(@Param('id') id: number, @Res() res: Response) {

        const data = await this.categoryService.getAllTaskDataByCategory(id)
        

        return res.status(200).json({message: "All data fetched", data: data})
    }
}