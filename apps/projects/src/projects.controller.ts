import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtRmqGuard } from '@app/common';
import { CurrentUserDecorator } from 'apps/auth/src/current-user.decorator';
import { User } from 'apps/auth/src/users/entities/user.entity';
import { AddProjectDto } from './dto/add-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
@UseGuards(JwtRmqGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getAllProjects(@CurrentUserDecorator() user: User) {
    return await this.projectsService.getAllProjects(user.id);
  }

  @Post()
  async addProject(@CurrentUserDecorator() user: User, @Body() addProjectDto: AddProjectDto) {
    return await this.projectsService.addProject(user.id, addProjectDto);
  }

  @Put('/:projectId')
  async updateProject(@CurrentUserDecorator() user: User, @Param('projectId') projectId: string, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectsService.updateProject(user.id, projectId, updateProjectDto)
  }
  
  @Delete('/:projectId')
  async deleteProject(@CurrentUserDecorator() user: User, @Param('projectId') projectId: string) {
    await this.projectsService.deleteProject(user.id, projectId);
  }

}
