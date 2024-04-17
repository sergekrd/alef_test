import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Hasher } from "../../common/utils/hasher";
import { CustomError } from "../../common/errors/custom.error";
import { UserAuthInput, UserCreationOutput } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hasher: Hasher,
    private readonly jwtService: JwtService
  ) {}
  public async signUp(dto: UserAuthInput): Promise<UserCreationOutput> {
    const user = await this.prisma.users.findFirst({
      where: { email: dto.email },
    });
    if (user)
      throw new CustomError(HttpStatus.BAD_REQUEST, `User with email ${dto.email} already exist`);
    const hashedPassword = this.hasher.hashSync(dto.password);
    return await this.prisma.users.create({
      data: { email: dto.email, password: hashedPassword },
      select: { id: true, email: true },
    });
  }

  public async logIn(dto: UserAuthInput, res: Response): Promise<Response> {
    const user = await this.prisma.users.findFirst({
      where: { email: dto.email },
    });
    if (!user)
      throw new CustomError(HttpStatus.BAD_REQUEST, `User with email ${dto.email} not found`);
    const isEqual = await this.hasher.comparer(dto.password, user.password);
    if (!isEqual) throw new CustomError(HttpStatus.BAD_REQUEST, `Wrong password`);
    const payload = { userId: user.id };

    const access_token = await this.jwtService.signAsync(payload);
    const today = new Date();
    today.setDate(today.getDate() + 1);
    res.cookie("access_token", access_token, { httpOnly: true, expires: today });
    return res.send();
  }
}
