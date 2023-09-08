import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskSchema } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Category, CategorySchema } from '../category/category.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Task, Category]),
    MongooseModule.forFeature([{name: 'Task', schema: TaskSchema},{name: 'Category', schema: CategorySchema},{name: 'User', schema: UserSchema}]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
