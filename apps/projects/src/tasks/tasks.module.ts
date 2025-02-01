import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TasksTypeOrmRepository } from './tasks-typeorm.repository';
import { AuthModule } from '@app/common';
import { BullQueueModule } from '@app/common/bullmq/bullmq.module';
import { TASK_QUEUE } from '@app/common/bullmq/bullmq.constant';
import { TasksConsumer } from './tasks.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule,
    BullQueueModule.register([TASK_QUEUE])
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksTypeOrmRepository, TasksConsumer],
  exports: [AuthModule],
})
export class TasksModule {}
