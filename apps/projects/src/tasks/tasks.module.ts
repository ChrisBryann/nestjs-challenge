import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TasksTypeOrmRepository } from './tasks-typeorm.repository';
import { AuthModule } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TasksTypeOrmRepository],
  exports: [AuthModule],
})
export class TasksModule {}
