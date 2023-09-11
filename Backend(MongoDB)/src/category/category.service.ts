import { Injectable } from "@nestjs/common";
import { Category } from "./category.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { TaskCategory } from "./category.enum";
import { User } from "src/auth/user.entity";

@Injectable()
export class CategoryService {

    constructor(
        @InjectModel('Category')
        private categoryModel: Model<Category>
    ) { }
    
    async getTasksCategory() {
        const data = await this.categoryModel.find()
        return data
    }
    async getAllTaskDataByCategory(id: string) {

        const data = await this.categoryModel.findOne({ uuid: id }).populate([{
            path: 'tasks',
            populate: {
                path: 'category',
                select: 'category'
            }
        },
        {
            path: 'tasks',
            populate: {
                path: 'user',
                select: 'username'
            }
        }])

        console.log(data)
        const { tasks, category } = data

        return tasks
    }

    // async filterTaskCategory(category: TaskCategory) {

    //     let tasks = await this.categoryModel.find({category})

    //     console.log("service", tasks)
    //     return tasks
    // }
}