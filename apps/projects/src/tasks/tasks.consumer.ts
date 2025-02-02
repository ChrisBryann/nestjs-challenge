import { TASK_QUEUE } from '@app/common/bullmq/bullmq.constant';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { ErrorCode, Job } from 'bullmq';
import { AddTaskDto } from './dto/add-task.dto';
import { TasksTypeOrmRepository } from './tasks-typeorm.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { ErrorDescription } from 'typeorm';

@Processor(TASK_QUEUE)
export class TasksConsumer extends WorkerHost {
  private readonly logger: Logger = new Logger(TasksConsumer.name);
  constructor(private readonly tasksRepository: TasksTypeOrmRepository) {
    super();
  }
  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(
      `Completed job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: any) {
    this.logger.log(
      `Job ${job.id} of type ${job.name} with data ${job.data} has failed.\nError details: ${JSON.stringify(error)}`,
    );
  }

  @OnWorkerEvent('error')
  onError(failedReason: any) {
    this.logger.log(
      `Error occured while running job: ${JSON.stringify(failedReason)}.`,
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
