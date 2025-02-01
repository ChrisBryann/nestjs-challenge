import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksTypeOrmRepository } from './tasks-typeorm.repository';
import { AddTaskDto } from './dto/add-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { TASK_QUEUE } from '@app/common/bullmq/bullmq.constant';
import { Queue } from 'bullmq';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksTypeOrmRepository,
    @InjectQueue(TASK_QUEUE) private readonly tasksQueue: Queue,
  ) {}

  async getAllTasks(userId: string, projectId: string) {
    return await this.tasksRepository.findAll({
      where: {
        createdBy: userId,
        project: {
          id: projectId,
        },
      },
      relations: {
        project: true,
      },
    });
  }

  async addTask(userId: string, projectId: string, addTaskDto: AddTaskDto) {
    return await this.tasksQueue.add('add_task', {
      userId,
      projectId,
      addTaskDto,
    });
  }

  async updateTask(
    userId: string,
    projectId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    return await this.tasksRepository.findOneAndUpdate(
      {
        where: {
          id: taskId,
          createdBy: userId,
          project: {
            id: projectId,
          },
        },
        relations: {
          project: true,
        },
      },
      updateTaskDto,
    );
  }

  async deleteTask(userId: string, projectId: string, taskId: string) {
    await this.tasksQueue.add('delete_task', {
      userId: userId,
      projectId,
      taskId,
    });
  }
}
