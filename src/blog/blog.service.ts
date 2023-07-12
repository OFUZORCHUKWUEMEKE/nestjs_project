import { Injectable } from '@nestjs/common';
import { Blog } from './blog.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IReq } from 'src/user/dto/req.user';
import { CreateBlog } from './dto/create-blog';

@Injectable()
export class BlogService {
    constructor(@InjectModel('Blog') private blogModel: Model<Blog>) { }

    async getBlog() {
       return await this.blogModel.find({})
    }

    async createBlog(user:IReq,credentials:CreateBlog){
       
    }
}
