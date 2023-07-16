import {Body, Controller,Post} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUser } from 'src/user/dto/create-user.dto'
import { ILOGIN } from './dto/auth.dto'
import { User } from 'src/user/user.schema'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}
    @Post('/register')
    async createUser(@Body() user:CreateUser):Promise<User>{
        return this.authService.Register(user)
    }

    @Post('/login')
    async Login(@Body() credentials:ILOGIN){
        return this.authService.Login(credentials) 
    }
}