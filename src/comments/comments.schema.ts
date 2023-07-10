import { Schema,Prop ,SchemaFactory} from "@nestjs/mongoose";
import mongoose ,{Document} from "mongoose";
import { Blog } from "src/blog/blog.schema";
import { User } from "src/user/user.schema";


@Schema()
export class Comments extends Document{
    @Prop()
    comment:string

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]})
    user:[User]

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Blog'})
    blog:Blog
}


export const CommentSchema = SchemaFactory.createForClass(Comments)