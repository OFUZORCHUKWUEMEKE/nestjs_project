import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Blog, BlogSchema } from './blog.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
  providers: [BlogService]
})
export class BlogModule { }
