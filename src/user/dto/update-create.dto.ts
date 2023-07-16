import { Exclude } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
export class UpdateUser {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName?: string


    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    profilePicture?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phoneNumber?: number

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    bio?: string
}