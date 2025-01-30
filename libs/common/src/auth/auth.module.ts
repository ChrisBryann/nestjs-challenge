import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RmqModule } from "../rmq/rmq.module";
import * as cookieParser from "cookie-parser";
import { AUTH_SERVICE } from "../rmq/rmq.constant";

@Module({
    imports: [RmqModule.register({name: AUTH_SERVICE})],
    exports: [RmqModule]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // implement cookie parsing: parse incoming cookie and look for potential JWT
    consumer.apply(cookieParser()).forRoutes('*'); // take cookies and add them to the current request object
    }
}