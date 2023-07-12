import { IsNotEmpty, IsString } from "class-validator";

export class CreateBlog {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    content: string
}