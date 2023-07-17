import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {MongooseModule} from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
// import { UserRepository } from './user.repository';



@Module({
    imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),CloudinaryModule],
    providers: [UserService,UserRepository],
    exports:[UserService,UserRepository],
    controllers:[UserController]
})
export class UserModule {}
