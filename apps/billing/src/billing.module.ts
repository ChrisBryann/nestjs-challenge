import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@app/common';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      envFilePath: './apps/billing/.env.development',
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
