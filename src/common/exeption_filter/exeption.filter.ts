import { Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { CustomError } from "../errors/custom.error";

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = 500;
    let message = "Internal Server Error";
    if (exception instanceof CustomError) {
      statusCode = exception.status_code;
      message = exception.message;
    } else {
      console.log(exception);
    }
    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
