import {Body, Controller,Post} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUser } from 'src/user/dto/create-user.dto'
import { ILOGIN } from './dto/auth.dto'


@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}
    @Post('/register')
    async createUser(@Body() user:CreateUser){
        return this.authService.Register(user)
    }

    @Post('/login')
    async Login(@Body() credentials:ILOGIN){
        return 
    }
}