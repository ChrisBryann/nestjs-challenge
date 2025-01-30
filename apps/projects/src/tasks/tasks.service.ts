import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksTypeOrmRepository } from './tasks-typeorm.repository';
import { AddTaskDto } from './dto/add-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksTypeOrmRepository) {}

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
    const task = await this.tasksRepository.create({
      ...addTaskDto,
      createdBy: userId,
      project: {
        id: projectId,
      },
    });

    return await this.tasksRepository.save(task);
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
    const task = await this.tasksRepository.findOne({
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
    });

    if (!task) {
      throw new NotFoundException('Task does not exist!');
    }

    await this.tasksRepository.remove(task);
  }
}
