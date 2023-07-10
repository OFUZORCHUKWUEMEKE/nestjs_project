import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/config'

const config = configuration()

@Module({
  imports: [
    UserModule
    , BlogModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRoot(config.mongoDB_URL),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
