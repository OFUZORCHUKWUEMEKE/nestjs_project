import { Injectable, CanActivate, ExecutionContext, NotAcceptableException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IReq } from '../dto/req.user';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, @InjectModel('User') private userModel: Model<User>) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        // console.log('dating')
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();

        const user: IReq = request.user;

        const currentUser = await this.userModel.findById(user.id)

        const there = roles.includes(currentUser.userType)

        console.log(there)

        if (roles.includes(currentUser.userType)) {
            return true
        } else {
            throw new NotAcceptableException()
        }
        // return matchRoles(roles, user.roles);
    }
}