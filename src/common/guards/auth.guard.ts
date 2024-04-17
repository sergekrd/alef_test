import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { CustomError } from "../errors/custom.error";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new CustomError(401, "Unauthorized");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request["user"] = payload;
    } catch (e) {
      throw new CustomError(401, "Unauthorized");
    }
    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    if (req && req.cookies) {
      if (!req.cookies["access_token"]) throw new CustomError(401, "Unauthorized");
      return req.cookies["access_token"];
    }
  }
}
