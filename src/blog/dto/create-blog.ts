import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBlog {
    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    title: string;


    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    content: string
}