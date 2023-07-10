import { Schema,Prop ,SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Types,Document, Mongoose } from "mongoose";
import { Blog } from "src/blog/blog.schema";

export enum UserType{
    REGULAR='customer',
    ADMIN='admin'
}

export type UserDocument = User & Document;

@Schema({timestamps:true})
export class User {
   @Prop({})
   _id:Types.ObjectId

   @Prop({required:true,unique:true})
   username:string

   @Prop({required:true,unique:true})
   email:string

   @Prop({required:true})
   firstName:string

   @Prop({required:true})
   lastName:string;
  
   @Prop({required:false})
   biography:string

   @Prop({required:false})
   profilePicture:string;

   @Prop({required:true})
   password:string;

   @Prop({require:false})
   token?:string

   @Prop({enum:UserType,default:UserType.REGULAR})
   userType:UserType

   @Prop({type:[{type:mongoose.Schema.Types.ObjectId}],ref:'User',required:false})
   blog:[Blog]

   @Prop({required:false})
   phoneNumber:number

   @Prop({default:false})
   isVerified:boolean

}

export const UserSchema = SchemaFactory.createForClass(User)