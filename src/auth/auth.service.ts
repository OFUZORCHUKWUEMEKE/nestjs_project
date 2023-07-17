import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/user/user.schema';
import mongoose, { Model, ObjectId } from 'mongoose'
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { CreateUser } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config'
import { comparePassword, hashpass } from 'src/utils/utils';
import { JwtService } from '@nestjs/jwt/dist';
import { ILOGIN } from './dto/auth.dto';
@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private readonly userService: UserService, private configService: ConfigService, private jwtService: JwtService) { }

    async Register(user: CreateUser) {

        try {
            const email = await this.userRepository.findEmail(user.email)

            const username = await this.userRepository.findUsername(user.username)

            if (email || username) throw new ConflictException('Username / Email Already Taken')

            const newUser = new User()

            const payload = { id: newUser._id, username: newUser.username, email: newUser.email }

            const token = await this.jwtService.signAsync(payload)


            const hashedPassword = await hashpass(user.password)

            newUser.email = user.email
            newUser.lastName = user.lastName
            newUser.firstName = user.firstName
            newUser.phoneNumber = user.phoneNumber
            newUser.profilePicture = user.profilePicture
            newUser.username = user.username
            newUser.password = hashedPassword
            newUser.token = token

            return await this.userService.createUser(newUser)
        } catch (error) {
            throw new HttpException(error.response, error.response.statusCode,{description:error.response.message})
            // console.log(error.response)
        }


    }

    async Login({ email, password }: ILOGIN): Promise<any> {

        const isUser = await this.userRepository.findEmail(email)

        console.log({email,password})

        // if (!isUser) throw new ConflictException('Invalid User Credentials')

        // const correctPassword = comparePassword(password, isUser.password)

        // if (!correctPassword) throw new ConflictException('Invalid User Credentials')

        // const payload = { id: isUser._id, username: isUser.username, email: isUser.email }

        // const token = await this.jwtService.signAsync(payload)

        // isUser.token = token

        // await isUser.save()

        // delete isUser.password

        // await isUser.save()

        return isUser

    }
}
