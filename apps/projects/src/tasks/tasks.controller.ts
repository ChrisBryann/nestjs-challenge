import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtRmqGuard } from '@app/common';
import { CurrentUserDecorator } from 'apps/auth/src/current-user.decorator';
import { User } from 'apps/auth/src/users/entities/user.entity';
import { AddTaskDto } from './dto/add-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { TASK_QUEUE } from '@app/common/bullmq/bullmq.constant';
import { Queue } from 'bullmq';

@Controller('projects/:projectId/tasks')
@UseGuards(JwtRmqGuard)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    @InjectQueue(TASK_QUEUE) private tasksQueue: Queue,
  ) {}

  @Get()
  async getAllTasks(
    @CurrentUserDecorator() user: User,
    @Param('projectId') projectId: string,
  ) {
    return await this.tasksService.getAllTasks(user.id, projectId);
  }

  @Post()
  async addTask(
    @CurrentUserDecorator() user: User,
    @Param('projectId') projectId: string,
    @Body() addTaskDto: AddTaskDto,
  ) {
    return await this.tasksQueue.add('add_task', {
      userId: user.id,
      projectId,
      addTaskDto,
    });
  }

  @Put('/:taskId')
  async updateTask(
    @CurrentUserDecorator() user: User,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.tasksService.updateTask(
      user.id,
      projectId,
      taskId,
      updateTaskDto,
    );
  }

  @Delete('/:taskId')
  async deleteTask(
    @CurrentUserDecorator() user: User,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.tasksQueue.add('delete_task', {
      userId: user.id,
      projectId,
      taskId,
    });
  }
}
