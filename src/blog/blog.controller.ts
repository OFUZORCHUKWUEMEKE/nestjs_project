import { Controller, Post, UseGuards, Get, Body, Delete, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/user/decorators/user.decorator';
import { IReq } from 'src/user/dto/req.user';
import { CreateBlog } from './dto/create-blog';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }
    @Get('/')
    async getBlog() {
        return await this.blogService.getBlog()
    }

    @Post('/')
    @UseGuards(AuthGuard)
    async createBlog(@User() user: IReq, @Body() credentials: CreateBlog) {
        return await this.blogService.createBlog(user, credentials)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteBlog(@Param('id') id: string, @User() user: IReq) {
        return this.blogService.deleteBlog(id, user)
    }
}
