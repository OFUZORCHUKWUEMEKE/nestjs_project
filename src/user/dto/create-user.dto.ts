import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";


export class CreateUser {

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    lastName: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @Exclude()
    password: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    profilePicture?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phoneNumber?: number

}