import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { APP_FILTER } from "@nestjs/core";
import { CustomExceptionFilter } from "./common/exeption_filter/exeption.filter";

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: CustomExceptionFilter }],
})
export class AppModule {}
