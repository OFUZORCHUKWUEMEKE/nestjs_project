import { Controller, Post, UseGuards, Get, Body, Delete, Param, UseInterceptors, UploadedFile, UploadedFiles, Req, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Userr } from 'src/user/decorators/user.decorator';
import { IReq } from 'src/user/dto/req.user';
import { CreateBlog } from './dto/create-blog';
import { ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UserType } from 'src/user/user.schema';
import { Roles } from 'src/user/decorators/roles.decorator';
import { UpdateBlogDto } from './dto/update-blog';

@ApiTags('Blog')
@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }
    @Get('/')
    async getBlog() {
        return await this.blogService.getBlog()
    }

    @Post('/')
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'url_image',
        maxCount: 1
    }, {
        name: 'cover_image',
        maxCount: 1
    }]))
    @UseGuards(AuthGuard)
    async createBlog(@Userr() user: IReq, @Body() credentials: CreateBlog, @UploadedFiles() files, @Req() req) {
        console.log(req.user)
        return await this.blogService.createBlog(user, credentials, files)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles(UserType.REGULAR)
    async deleteBlog(@Param('id') id: string, @Userr() user: IReq) {
        return this.blogService.deleteBlog(id, user)
    }


    @Put('/update')
    @UseGuards(AuthGuard)
    async updateBlog(@Userr() user:IReq,@Body() body:UpdateBlogDto) {
        return this.blogService.updateBlog(user,body)
    }
}
