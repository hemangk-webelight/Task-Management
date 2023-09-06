import { IsNotEmpty } from "class-validator"

export class CreateTaskDto{

    @IsNotEmpty()
    categoryType: string

    @IsNotEmpty({message: "Please provide task title, it should not be empty"})
    title: string

    @IsNotEmpty({message: "Please provide task description, it should not be empty"})
    description: string
}