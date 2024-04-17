import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { ChildEntity } from "src/entities/child.entity";
import { UserEntity } from "src/entities/user.entity";

export class ChildCreateInput extends OmitType(ChildEntity, [
  "id",
  "createdAt",
  "updatedAt",
  "parent_id",
]) {}

export class ChildInput extends PartialType(
  OmitType(ChildEntity, ["id", "createdAt", "updatedAt", "parent_id"])
) {}

class Parent extends OmitType(UserEntity, ["createdAt", "updatedAt", "password"]) {}
export class ChildOutput extends ChildEntity {
  @ApiProperty({ type: () => Parent })
  parent: Parent;
}
