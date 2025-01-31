import { TASK_QUEUE } from '@app/common/bullmq/bullmq.constant';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { config } from 'dotenv';
import { TasksService } from './tasks.service';
import { AddTaskDto } from './dto/add-task.dto';

@Processor(TASK_QUEUE)
export class TasksConsumer extends WorkerHost {
  constructor(private readonly tasksService: TasksService) {
    super();
  }
  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
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
        const task = await this.tasksService.addTask(
          userId,
          projectId,
          addTaskDto,
        );

        return task;
      }
      case 'delete_task': {
        const { userId, projectId, taskId } = job.data as {
          userId: string;
          projectId: string;
          taskId: string;
        };

        await this.tasksService.deleteTask(userId, projectId, taskId);

        break;
      }
    }
  }
}
