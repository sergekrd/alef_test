import { ApiProperty } from "@nestjs/swagger";
import { enum_gender } from "@prisma/client";
import { IsEmail, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UserEntity {
  @ApiProperty({
    type: String,
    example: "0a915dd8-890e-4404-a5a3-aa65a2d00872",
  })
  @IsUUID(4)
  public readonly id: string;

  @ApiProperty({ type: String, example: "test@mail.ru" })
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ type: String, example: "secret" })
  @IsString()
  public readonly password: string;

  @ApiProperty({ type: String, example: "Антон" })
  @IsString()
  @IsOptional()
  public readonly first_name: string;

  @ApiProperty({ type: String, example: "Петрович" })
  @IsString()
  @IsOptional()
  public readonly middle_name: string;

  @ApiProperty({ type: String, example: "Иванов" })
  @IsString()
  @IsOptional()
  public readonly last_name: string;

  @ApiProperty({ type: Number, example: 25 })
  @IsNumber()
  @IsOptional()
  public readonly age: number;

  @ApiProperty({
    enum: [enum_gender.female, enum_gender.male],
    example: enum_gender.female,
  })
  @IsOptional()
  public readonly gender: enum_gender;

  @ApiProperty({ type: Date, example: new Date() })
  @IsOptional()
  public readonly createdAt: Date;

  @ApiProperty({ type: Date, example: new Date() })
  @IsOptional()
  public readonly updatedAt: Date;
}
