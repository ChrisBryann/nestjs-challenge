import { BullModule } from '@nestjs/bullmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow<string>('BULLMQ_HOST'),
          port: +configService.getOrThrow<string>('BULLMQ_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [BullModule]
})
export class BullQueueModule {
  static register(queueNames: string[]): DynamicModule {
    return {
      module: BullQueueModule,
      imports: [
        // BullModule.registerQueueAsync(
        //   ...queueNames.map((name) => ({
        //     useFactory: (configService: ConfigService) => ({
        //       name,
        //       connection: {
        //         port: +configService.getOrThrow<string>(
        //           `BULLMQ_${name}_QUEUE_PORT`,
        //         ),
        //       },
        //     }),
        //     inject: [ConfigService],
        //   })),
        // ), // this was not working with now async and configService is
        BullModule.registerQueue(...queueNames.map((name) => ({
          name,
        })))
      ],
      exports: [BullModule]
    };
  }
}
