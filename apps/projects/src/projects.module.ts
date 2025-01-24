import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TasksModule } from './tasks/tasks.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [TasksModule],
})
export class ProjectsModule {}
