import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectsTypeormRepository } from './projects-typeorm.repository';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsTypeormRepository],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/projects/.env.development',
    }),
    TasksModule,
    TypeOrmModule.forFeature([Project]),
    DatabaseModule,
  ],
})
export class ProjectsModule {}
