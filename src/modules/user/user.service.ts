import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CustomError } from "../../common/errors/custom.error";
import { UserOutput, UserUpdateInput } from "./dto/user.dto";
import { ChildCreateInput, ChildInput, ChildOutput } from "./dto/child.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  userSelect = {
    id: true,
    email: true,
    first_name: true,
    middle_name: true,
    last_name: true,
    age: true,
    gender: true,
    createdAt: true,
    updatedAt: true,
  };
  childSelect = {
    id: true,
    first_name: true,
    middle_name: true,
    last_name: true,
    age: true,
    gender: true,
    createdAt: true,
    updatedAt: true,
  };
  public async getUser(userId: string): Promise<UserOutput> {
    return this.prisma.users.findFirst({
      where: { id: userId },
      select: { ...this.userSelect, childs: { select: this.childSelect } },
    });
  }

  async patchUser(userId: string, dto: UserUpdateInput): Promise<UserOutput> {
    return this.prisma.users.update({
      where: { id: userId },
      data: dto,
      select: { ...this.userSelect, childs: { select: this.childSelect } },
    });
  }

  public async addChild(userId: string, dto: ChildCreateInput): Promise<ChildOutput> {
    const childsCount = await this.prisma.childs.count({ where: { parent_id: userId } });
    if (childsCount === Number(process.env.CHILDS_MAX_VALUE))
      throw new CustomError(HttpStatus.BAD_REQUEST, `User has max children value: ${childsCount}`);
    return this.prisma.childs.create({
      data: { ...dto, parent: { connect: { id: userId } } },
      include: { parent: { select: this.userSelect } },
    });
  }

  public async getChild(userId: string, childId: number): Promise<ChildOutput> {
    return this.prisma.childs.findFirst({
      where: { parent_id: userId, id: childId },
      include: {
        parent: {
          select: this.userSelect,
        },
      },
    });
  }

  public async getChildren(userId: string): Promise<ChildOutput[]> {
    return this.prisma.childs.findMany({
      where: { parent_id: userId },
      include: {
        parent: {
          select: this.userSelect,
        },
      },
    });
  }

  public async patchChild(userId: string, childId: number, dto: ChildInput): Promise<ChildOutput> {
    const child = await this.prisma.childs.findFirst({ where: { parent_id: userId, id: childId } });
    if (!child)
      throw new CustomError(HttpStatus.BAD_REQUEST, "You are not the parent of this child");
    return this.prisma.childs.update({
      where: { parent_id: userId, id: childId },
      data: dto,
      include: {
        parent: {
          select: this.userSelect,
        },
      },
    });
  }

  public async deleteChild(userId: string, childId: number): Promise<ChildOutput> {
    const child = await this.prisma.childs.findFirst({ where: { parent_id: userId, id: childId } });
    if (!child)
      throw new CustomError(HttpStatus.BAD_REQUEST, "You are not this parent of this child");
    return this.prisma.childs.delete({
      where: { parent_id: userId, id: childId },
      include: {
        parent: {
          select: this.userSelect,
        },
      },
    });
  }
}
