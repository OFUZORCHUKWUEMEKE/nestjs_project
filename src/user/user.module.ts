import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {MongooseModule} from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
// import { UserRepository } from './user.repository';



@Module({
    imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    providers: [UserService,UserRepository],
    exports:[UserService,UserRepository],
    controllers:[UserController]
})
export class UserModule {}
