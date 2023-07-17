import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Blog } from './blog.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IReq } from 'src/user/dto/req.user';
import { CreateBlog } from './dto/create-blog';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.schema';

@Injectable()
export class BlogService {
    constructor(@InjectModel('Blog') private blogModel: Model<Blog>, private readonly userService: UserService, private readonly userRepository: UserRepository) { }

    async getBlog() {
        return await this.blogModel.find({}).populate('user')
    }

    async createBlog(user: IReq, credentials: CreateBlog, file) {

        try {
            console.log(file)

            let currentUser = await this.userRepository.findById(user.id)

            console.log(credentials)

            // return credentials

            const blog = new Blog()


            blog.user = currentUser
            blog.content = credentials.content
            blog.description = credentials.description
            blog.title = credentials.title

            let newBlog = await this.blogModel.create(blog)

            // console.log(newBlog)

            currentUser.blog.push(newBlog)

            await currentUser.save()

            return await currentUser

        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }


        // return (await this.userRepository.findById(currentUser._id)).populate('blog')

    }

    async deleteBlog(id: string, user: IReq) {
        if (id !== user.id) throw new HttpException('Not Authourized', 403)
        await this.blogModel.findOneAndDelete({ _id: id })
        return 'Successfully Deleted Model'
    }
}
