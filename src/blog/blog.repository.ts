import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../core/repository.core';
// import { User, UserDocument } from './user.schema';
import { Blog, BlogDocument } from './blog.schema';

@Injectable()
export class BlogRepository extends BaseRepository<BlogDocument> {
  constructor(@InjectModel(Blog.name) userModel: Model<BlogDocument>) {
    super(userModel);
  }
}
