import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {MongooseModule} from '@nestjs/mongoose'
import { CommentSchema, Comments } from './comments.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Comments.name,schema:CommentSchema}])],
  providers: [CommentsService]
})
export class CommentsModule {}
