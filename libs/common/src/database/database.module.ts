import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
          
          type: 'mysql',
          host: configService.getOrThrow<string>('MYSQL_HOST'),
        port: +configService.getOrThrow<string>('PORT'),
        username: configService.getOrThrow<string>('MYSQL_USERNAME'),
        password: configService.getOrThrow<string>('MYSQL_DB_PASSWORD'),
        database: configService.getOrThrow<string>('MYSQL_DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
        }),
        inject: [ConfigService]
      }),]
})
export default class DatabaseModule {}