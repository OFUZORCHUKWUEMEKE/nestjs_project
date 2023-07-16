import { ApiProperty } from "@nestjs/swagger";

export class ILOGIN {

    @ApiProperty({ required: true })
    email: string;

    @ApiProperty({ required: true })
    password: string
    
}