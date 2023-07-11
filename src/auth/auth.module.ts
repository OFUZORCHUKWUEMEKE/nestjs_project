import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/config'


const config = configuration()

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: config.JWT_SECRET,
    signOptions: { expiresIn: '30d' }
  })],
  controllers: [AuthController],
  providers: [AuthService],
  // exports:[AuthService]
})
export class AuthModule { }
