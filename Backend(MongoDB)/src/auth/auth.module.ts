import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer'; 
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config'
import { MongooseModule } from '@nestjs/mongoose';

const jwtConfig = config.get('jwt')

@Module({
  imports: [

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    }),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),

    MailerModule.forRoot({
      
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})

export class AuthModule { }
