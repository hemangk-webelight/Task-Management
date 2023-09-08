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


        const data = await this.categoryRepository.find({where: {id}})

        const {users, tasks, category} = data[0]
        const all_data = tasks.map(task => {
            
            const { user, ...rest} = task
            const { password, salt, ...remaining} = user
            return {...rest, ...remaining, category}
        })
        return all_data
    }
}