import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
    
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ){}

    async getAllTaskDataByCategory(id: number) {


        const data = await this.categoryRepository.findOne({where: {id}})

        console.log("here",(data))
    
        const { users, tasks } = data
        const allTaskData = users.map(user => {
            const {password, salt, ...rest} = user
            return rest
        })
        return allTaskData
    }
}