import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUser } from './dto/create-user.dto';
import { IReq } from './dto/req.user';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async createUser(user:CreateUser):Promise<any>{
       return await this.userModel.create(user)         
    }

    async getUsers():Promise<User[]>{
        return await this.userModel.find({})
    }
    
    async getProfile(user:IReq):Promise<User>{
        return await this.userModel.findById(user.id)
    }
}
