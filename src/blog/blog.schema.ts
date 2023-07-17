import mongoose, { Document, mongo } from "mongoose";
import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/user.schema";


export type BlogDocument = Blog & Document;
@Schema()
export class Blog{
   _id?: any;

   @Prop({required:true})
   title:string

   @Prop({required:true})
   description:string

   @Prop({required:true})
   content:string

   @Prop({required:false})
   cover_image:string

   @Prop({required:false})
   url_image:string

   @Prop({required:true,ref:'User',type:mongoose.Schema.Types.ObjectId})
   user:User

//    @Prop()
//    comments:string

//    @Prop()
//    likes:string
}

export const BlogSchema = SchemaFactory.createForClass(Blog)