import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/user/user.schema';
import { Model } from 'mongoose'
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { CreateUser } from 'src/user/dto/create-user.dto';
import {ConfigService} from '@nestjs/config'
import { hashpass } from 'src/utils/utils';
@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private readonly userService: UserService,private configService:ConfigService) {}
    async Register(user: CreateUser) {

       const email = await this.userRepository.findEmail(user.email)

       const username = await this.userRepository.findUsername(user.username)

       if(email || username ) throw new ConflictException('Username / Email Already Taken')

       const newUser = new User()

       const hashedPassword = await hashpass(user.password)

       newUser.email = user.email
       newUser.lastName=user.lastName
       newUser.firstName= user.firstName
       newUser.phoneNumber = user.phoneNumber
       newUser.profilePicture = user.profilePicture
       newUser.username = user.username
       newUser.password = hashedPassword
        
       return await this.userService.createUser(newUser)
    }

}
