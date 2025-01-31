import { BullModule } from '@nestjs/bullmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow<string>('BULLMQ_HOST'),
          port: configService.getOrThrow<string>('BULLMQ_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BullQueueModule {
    static register(queueNames: string[]): DynamicModule {
        return {
          module: BullQueueModule,
          imports: [
            BullModule.registerQueueAsync(
              ...queueNames.map((name) => ({
                useFactory: (configService: ConfigService) => ({
                  name,
                  connection: {
                    port: +configService.getOrThrow<string>(
                      `BULLMQ_${name}_QUEUE_PORT`,
                    ),
                  },
                }),
                inject: [ConfigService],
              })),
            ),
          ],
        };
    }
}
