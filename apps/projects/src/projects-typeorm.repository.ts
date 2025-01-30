import { AbstractTypeOrmRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsTypeormRepository extends AbstractTypeOrmRepository<Project> {
  constructor(
    @InjectRepository(Project) projectsRepository: Repository<Project>,
  ) {
    super(projectsRepository);
  }
}
