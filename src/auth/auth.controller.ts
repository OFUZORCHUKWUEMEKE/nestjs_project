import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUser } from 'src/user/dto/create-user.dto'
import { ILOGIN } from './dto/auth.dto'
import { User } from 'src/user/user.schema'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('/register')
    async createUser(@Body() user: CreateUser): Promise<any> {
        return await this.authService.Register(user)
    }

    @Post('/login')
    async Login(@Body() credentials) {
        console.log(credentials)
        return await this.authService.Login(credentials)
    }
}