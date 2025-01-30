import { AbstractTypeOrmRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksTypeOrmRepository extends AbstractTypeOrmRepository<Task> {
  constructor(@InjectRepository(Task) tasksRepository: Repository<Task>) {
    super(tasksRepository);
  }
}
