import { Controller, Get, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtRmqGuard } from '@app/common/auth/jwt-rmq.guard';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common/rmq/rmq.service';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @UseGuards(JwtRmqGuard)
  @EventPattern('project_created')
  handleProjectCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }
}
