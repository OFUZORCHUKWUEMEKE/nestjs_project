import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Blog, BlogSchema } from './blog.schema';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { UserModule } from 'src/user/user.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),UserModule,CloudinaryModule],
  providers: [BlogService, BlogRepository],
  controllers: [BlogController]
})
export class BlogModule { }
