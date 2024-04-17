import { PickType } from "@nestjs/swagger";
import { UserEntity } from "src/entities/user.entity";

export class UserCreationOutput extends PickType(UserEntity, ["id", "email"]) {}

export class UserAuthInput extends PickType(UserEntity, ["email", "password"]) {}
