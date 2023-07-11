import { Controller, Get, Post,UseGuards,Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/guards/auth.gaurds";
import { User } from "./decorators/user.decorator";
import { Request } from "express";
import { IReq } from "./dto/req.user";


@Controller('users')
export class UserController{
    constructor(private readonly userService:UserService){}
    @Get('/')
    async getUsers(){
        return this.userService.getUsers()
    }

    @Get('/profile')
    @UseGuards(AuthGuard)
    async getProfile(@User() user:IReq){          
        let currentUser = await this.userService.getProfile(user)
        delete currentUser.password

        return currentUser
    }
}