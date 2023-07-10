import { IsString ,IsNotEmpty,IsOptional} from "class-validator";


export class CreateUser {
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    firstName:string

    @IsString()
    @IsNotEmpty()
    lastName:string

    @IsString()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsOptional()
    profilePicture?:string

    @IsString()
    @IsOptional()
    phoneNumber?:number

    
}