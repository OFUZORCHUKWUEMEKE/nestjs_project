import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/user/user.schema';
import { Model } from 'mongoose'
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { CreateUser } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config'
import { comparePassword, hashpass } from 'src/utils/utils';
import { JwtService } from '@nestjs/jwt/dist';
import { ILOGIN } from './dto/auth.dto';
@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private readonly userService: UserService, private configService: ConfigService, private jwtService: JwtService) {}

    async Register(user: CreateUser) {

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
    }

    async Login({ email, password }: ILOGIN): Promise<any> {

        const isUser = await this.userRepository.findEmail(email)

        if (!isUser) throw new ConflictException('Invalid User Credentials')

        const correctPassword = comparePassword(password, isUser.password)

        if (!correctPassword) throw new ConflictException('Invalid User Credentials')

        const payload = { id: isUser._id, username: isUser.username, email: isUser.email }

        const token = await this.jwtService.signAsync(payload)

        isUser.token = token

        await isUser.save()

        return token

    }
}
