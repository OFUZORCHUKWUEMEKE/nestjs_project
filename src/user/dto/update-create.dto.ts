import { Exclude } from "class-transformer";
import { IsString ,IsNotEmpty,IsOptional} from "class-validator";

export class UpdateUser{
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username?:string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName?:string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName?:string

    @IsString()
    @IsOptional()
    profilePicture?:string

    @IsString()
    @IsOptional()
    phoneNumber?:number

    @IsString()
    @IsOptional()
    bio?:string
}