import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsTypeormRepository } from './projects-typeorm.repository';
import { AddProjectDto } from './dto/add-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsTypeormRepository) {}

  async getAllProjects(userId: string) {
    return await this.projectsRepository.findAll({
      where: {
        createdBy: userId,
      },
    });
  }

  async addProject(userId: string, addProjectDto: AddProjectDto) {
    const project = await this.projectsRepository.create({
      ...addProjectDto,
      createdBy: userId,
    });
    return await this.projectsRepository.save(project);
  }

  async updateProject(
    userId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectsRepository.findOneAndUpdate(
      {
        where: {
          id: projectId,
          createdBy: userId,
        },
      },
      updateProjectDto,
    );
  }

  async deleteProject(userId: string, projectId: string) {
    const project = await this.projectsRepository.findOneBy({
        id: projectId,
        createdBy: userId,
    })
    if(!project) {
        throw new NotFoundException('Project does not exist!')
    }
    await this.projectsRepository.remove(project);
  }
}
