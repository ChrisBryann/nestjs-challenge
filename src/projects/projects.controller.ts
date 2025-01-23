import { Controller, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  

}
