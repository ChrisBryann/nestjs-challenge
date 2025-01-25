import { ConfigService } from "@nestjs/config";
import { User } from "apps/auth/src/users/entities/user.entity";
import { Project } from "apps/projects/src/entities/project.entity";
import { Task } from "apps/projects/src/entities/task.entity";
import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

config({
    path: './.env'
})

const configService = new ConfigService();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.getOrThrow<string>('POSTGRES_HOST'),
    port: parseInt(configService.getOrThrow<string>('POSTGRES_PORT'), 5432),
    username: configService.getOrThrow<string>('POSTGRES_USERNAME'),
    password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
    database: configService.getOrThrow<string>('POSTGRES_DB_NAME'),
    synchronize: false,
    entities:
    configService.getOrThrow('NODE_ENV') === "production"
      ? ["dist/entities/**/*.js"]
      : [User, Task, Project],
  migrations:
  configService.getOrThrow('NODE_ENV') === "production"
      ? ["dist/migrations/**/*.js"]
      : ["database/migrations/**/*.ts"],
    migrationsRun: false,
    logging: true,
  });
  
  export default AppDataSource;