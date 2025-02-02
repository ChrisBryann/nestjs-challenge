import { TASK_QUEUE } from '@app/common/bullmq/bullmq.constant';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AddTaskDto } from './dto/add-task.dto';
import { TasksTypeOrmRepository } from './tasks-typeorm.repository';
import { NotFoundException } from '@nestjs/common';

@Processor(TASK_QUEUE)
export class TasksConsumer extends WorkerHost {
  constructor(private readonly tasksRepository: TasksTypeOrmRepository) {
    super();
  }
  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  async process(job: Job, token?: string): Promise<any> {
    switch (job.name) {
      case 'add_task': {
        const { userId, projectId, addTaskDto } = job.data as {
          userId: string;
          projectId: string;
          addTaskDto: AddTaskDto;
        };
        const task = await this.tasksRepository.create({
          ...addTaskDto,
          createdBy: userId,
          project: {
            id: projectId,
          },
        });
    
        return await this.tasksRepository.save(task);
      }
      case 'delete_task': {
        const { userId, projectId, taskId } = job.data as {
          userId: string;
          projectId: string;
          taskId: string;
        };

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

        break;
      }
    }
  }
}
