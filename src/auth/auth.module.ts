import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[UserModule],
  controllers:[AuthController],
  providers: [AuthService],
  // exports:[AuthService]
})
export class AuthModule {}
