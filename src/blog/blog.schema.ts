import mongoose, { Document, mongo } from "mongoose";
import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/user.schema";

@Schema()
export class Blog extends Document{
   @Prop({required:true})
   title:string

   @Prop({required:true})
   description:string

   @Prop({required:true})
   content:string

   @Prop({required:true,ref:'User',type:[{type:mongoose.Schema.Types.ObjectId}]})
   user:User
}

export const BlogSchema = SchemaFactory.createForClass(Blog)