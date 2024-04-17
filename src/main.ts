import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle("Test example")
    .setDescription("The test API description")
    .setVersion("1.0")
    .addTag("test")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(5020);
}
bootstrap();
