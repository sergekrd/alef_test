import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { ChildEntity } from "src/entities/child.entity";
import { UserEntity } from "src/entities/user.entity";

export class UserOutput extends OmitType(UserEntity, ["password"]) {
  @ApiProperty({ type: () => [Child] })
  childs: Child[];
}

export class UserUpdateInput extends PartialType(
  OmitType(UserEntity, ["password", "id", "createdAt", "updatedAt", "email"])
) {}

class Child extends OmitType(ChildEntity, ["parent_id"]) {}
