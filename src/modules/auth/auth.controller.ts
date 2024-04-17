import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserAuthInput, UserCreationOutput } from "./auth.dto";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signIn")
  async signUp(@Body() dto: UserAuthInput): Promise<UserCreationOutput> {
    return this.authService.signUp(dto);
  }

  @Post("/logIn")
  async logIn(@Body() dto: UserAuthInput, @Res() res: Response): Promise<Response> {
    return this.authService.logIn(dto, res);
  }
}
