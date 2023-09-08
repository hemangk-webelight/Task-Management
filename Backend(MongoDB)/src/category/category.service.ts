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

    async getAllTaskDataByCategory(id: ObjectId) {

        const data = await this.categoryModel.findById({ _id: id }).populate([{
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


        const { tasks, category } = data

        return tasks
    }

    // async filterTaskCategory(category: TaskCategory) {

    //     let tasks = await this.categoryModel.find({category})

    //     console.log("service", tasks)
    //     return tasks
    // }
}