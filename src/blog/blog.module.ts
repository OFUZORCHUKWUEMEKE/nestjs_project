import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Blog, BlogSchema } from './blog.schema';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),UserModule],
  providers: [BlogService, BlogRepository],
  controllers: [BlogController]
})
export class BlogModule { }
