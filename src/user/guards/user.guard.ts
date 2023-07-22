import { Injectable, CanActivate, ExecutionContext, NotAcceptableException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IReq } from '../dto/req.user';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { Model } from 'mongoose';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, @InjectModel('User') private userModel: Model<User>, private jwtService: JwtService, private configService: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        console.log(roles)
        if (!roles) {
            return true;
        }
        let request = context.switchToHttp().getRequest();

        const user = await this.extractTokenFromHeader(request)

        request.user = user

        const currentUser = await this.userModel.findOne({ _id: user.id })

        if (roles.includes(currentUser.userType)) {
            return true
        } else {
            throw new NotAcceptableException('Not Authourise to Perform such action')
        }
    }

    async extractTokenFromHeader(request) {
        const token = request.headers.authorization.split(' ')[1]
        const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('JWT_SECRET') })
        return payload
    }
}