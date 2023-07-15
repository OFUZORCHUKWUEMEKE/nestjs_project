import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUser } from './dto/create-user.dto';
import { IReq } from './dto/req.user';
import { UpdateUser } from './dto/update-create.dto';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>, private userRepository: UserRepository) { }

    async createUser(user: CreateUser): Promise<any> {
        return await this.userModel.create(user)
    }

    async getUsers(): Promise<any> {
        return await this.userModel.find({}).populate('blog')
    }

    async getProfile(user: IReq): Promise<any> {
        return (await this.userModel.findById(user.id)).populate('blog')
    }

    async editProfile(user: IReq, credentials: UpdateUser): Promise<any> {
        if (credentials.username) {
            const username = await this.userRepository.findUsername(credentials.username)
            if (username) throw new HttpException('Username Already Taken', HttpStatus.CONFLICT)
            await this.userModel.findByIdAndUpdate(user.id, credentials)
            return await this.userModel.findById(user.id)
        }
    }
}
