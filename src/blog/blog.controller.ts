import { Controller, Post } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }
    @Post('/')
    async getBlog(){
        return await this.blogService.getBlog()
    }
}
