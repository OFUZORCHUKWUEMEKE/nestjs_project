import { Controller, Get, Post, UseGuards, Req, Put, Body, Delete, Param, HttpException, UseInterceptors, UploadedFile, ParseFilePipe, BadRequestException } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { User } from "./decorators/user.decorator";
import { Request } from "express";
import { IReq } from "./dto/req.user";
import { UpdateUser } from "./dto/update-create.dto";
import { Roles } from "./decorators/roles.decorator";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { RolesGuard } from "./guards/user.guard";
// import { error } from "console";

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private cloudinaryService: CloudinaryService) { }
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
    @UseGuards(AuthGuard,RolesGuard)
    // @Roles('admin')
    async deleteUser(@Param('id') id: string) {
        try {
            return 'Its Working'
        } catch (error) {
            throw new HttpException('Not Authourised', 403)
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Body() body) {
        console.log(file)
        if (!file) {
            return {
                ...body,
                // file: file.buffer.toString()
            }
        } else {
            const fileString = await this.cloudinaryService.uploadImage(file)
            return {
                ...body,
                // file: file.buffer.toString(),
                files: fileString.url
            }
        }

    }
}