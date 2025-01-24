import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
          
          type: 'postgres',
          host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: +configService.getOrThrow<string>('POSTGRES_PORT'),
        username: configService.getOrThrow<string>('POSTGRES_USERNAME'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: configService.getOrThrow<string>('POSTGRES_DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
        }),
        inject: [ConfigService]
      }),]
})
export class DatabaseModule {}