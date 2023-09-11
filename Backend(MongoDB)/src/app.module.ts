import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://hemangk_webelight:oH30uJ6mb0yXyAc3@hemang-webelight.enfiyyu.mongodb.net/taskmanagement`),
    TasksModule, 
    AuthModule, 
    CategoryModule
  ],
})
export class AppModule {}