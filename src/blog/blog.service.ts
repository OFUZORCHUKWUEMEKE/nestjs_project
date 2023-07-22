import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Blog } from './blog.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IReq } from 'src/user/dto/req.user';
import { CreateBlog } from './dto/create-blog';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BlogService {
    constructor(@InjectModel('Blog') private blogModel: Model<Blog>, private readonly userService: UserService, private readonly userRepository: UserRepository, private cloudinary: CloudinaryService) { }

    async getBlog() {
        return await this.blogModel.find({}).populate('user')
    }

    async createBlog(user: IReq, credentials: CreateBlog, file) {
        const { cover_image, url_image } = file

        try {

            let currentUser = await this.userRepository.findById(user.id)

            const blog = new Blog()

            blog.user = currentUser
            blog.content = credentials.content
            blog.description = credentials.description
            blog.title = credentials.title

            if (cover_image) {
                const cover_image_url = await this.cloudinary.uploadImage(cover_image[0])
                blog.cover_image = cover_image_url.url
            }
            // if (url_image) {
            //     const url_image_URL = await this.cloudinary.uploadImage(url_image)
            //     blog.url_image = url_image_URL.url
            // }

            console.log(blog)

            let newBlog = await this.blogModel.create(blog)


            currentUser.blog.push(newBlog)

            await currentUser.save()

            return newBlog

        } catch (error) {
            throw new HttpException(error.response, HttpStatus.BAD_REQUEST)
        }

    }

    async deleteBlog(id: string, user: IReq) {
        // if (id !== user.id) throw new HttpException('Not Authourized', 403)
        // await this.blogModel.findOneAndDelete({ _id: id })
        // return 'Successfully Deleted Model'
        return {
            id,
            user_id:user.id
        }
    }
}
