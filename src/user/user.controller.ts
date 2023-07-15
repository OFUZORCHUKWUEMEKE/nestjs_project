import { Controller, Get, Post, UseGuards, Req, Put, Body, Delete, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { User } from "./decorators/user.decorator";
import { Request } from "express";
import { IReq } from "./dto/req.user";
import { UpdateUser } from "./dto/update-create.dto";
import { Roles } from "./decorators/roles.decorator";


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get('/')
    async getUsers() {
        return this.userService.getUsers()
    }

    @Get('/profile')
    @UseGuards(AuthGuard)
    async getProfile(@User() user: IReq) {
        let currentUser = await this.userService.getProfile(user)
        // const {password,...others} = currentUser
        // await delete currentUser.password
        return currentUser
    }

    @Put('/edit/profile')
    @UseGuards(AuthGuard)
    async editProfile(@User() user, @Body() credentials: UpdateUser) {
        return await this.userService.editProfile(user, credentials)
    }

    @Delete('/delete')
    @UseGuards(AuthGuard)
    @Roles('admin')
    async deleteUser(@Param('id') id: string) {
        try {
            return 'Its Working'
        } catch (error) {

        }
    }
}