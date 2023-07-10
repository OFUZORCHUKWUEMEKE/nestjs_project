import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUser } from './dto/create-user.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async createUser(user:CreateUser):Promise<any>{
       return await this.userModel.create(user)         
    }
}
