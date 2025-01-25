import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: +configService.getOrThrow<string>('POSTGRES_PORT'),
        username: configService.getOrThrow<string>('POSTGRES_USERNAME'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: configService.getOrThrow<string>('POSTGRES_DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migrations/*{.ts, .js}'],
        autoLoadEntities: true,
        synchronize: false, // Set to false in production
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
