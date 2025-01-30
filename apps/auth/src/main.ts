import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from '@app/common/rmq/rmq.service';
import { ValidationPipe } from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(AUTH_SERVICE, true)); // don't want to manually acknowledge message, because we're using the request response based message patterns instead of events
  app.useGlobalPipes(new ValidationPipe())
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
