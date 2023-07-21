import { Controller, Post, UseGuards, Get, Body, Delete, Param, UseInterceptors, UploadedFile, UploadedFiles, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/user/decorators/user.decorator';
import { IReq } from 'src/user/dto/req.user';
import { CreateBlog } from './dto/create-blog';
import { ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

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
    async createBlog(@User() user: IReq, @Body() credentials: CreateBlog, @UploadedFiles() files, @Req() req) {
        console.log(req.user)
        return await this.blogService.createBlog(user, credentials, files)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteBlog(@Param('id') id: string, @User() user: IReq) {
        return this.blogService.deleteBlog(id, user)
    }
}
