import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../common/guards/auth.guard";
import { UserId } from "../../common/decorators/user.id.decorator";
import { childs } from "@prisma/client";
import { UserOutput, UserUpdateInput } from "./dto/user.dto";
import { ChildCreateInput, ChildInput } from "./dto/child.dto";

@UseGuards(AuthGuard)
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  async getUser(@UserId() userId: string): Promise<UserOutput> {
    return this.userService.getUser(userId);
  }

  @Patch("/")
  async patchUser(@UserId() userId: string, @Body() dto: UserUpdateInput): Promise<UserOutput> {
    return this.userService.patchUser(userId, dto);
  }

  @Post("/child")
  async addChild(@UserId() userId: string, @Body() dto: ChildCreateInput): Promise<childs> {
    return this.userService.addChild(userId, dto);
  }

  @Get("/child/all")
  async getChildren(@UserId() userId: string): Promise<childs[]> {
    return this.userService.getChildren(userId);
  }

  @Get("/child/:childId")
  async getChild(@UserId() userId: string, @Param("childId") childId: number): Promise<childs> {
    return this.userService.getChild(userId, childId);
  }

  @Patch("/child/:childId")
  async patchChild(
    @UserId() userId: string,
    @Param("childId") childId: number,
    @Body() dto: ChildInput
  ): Promise<childs> {
    return this.userService.patchChild(userId, childId, dto);
  }

  @Delete("/child/:childId")
  async deleteChild(@UserId() userId: string, @Param("childId") childId: number): Promise<childs> {
    return this.userService.deleteChild(userId, childId);
  }
}
