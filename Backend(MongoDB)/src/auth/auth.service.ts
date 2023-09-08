import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from './user.entity';
import * as randomstring from 'randomstring'
import * as bcrypt from 'bcrypt'
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/authCredentials.dto';
import { Jwtpayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService')

    constructor(

        @InjectModel("User")
        private userModel: Model<User>,
        private jwtService: JwtService,
        private mailerService: MailerService
    ) { }

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {


        const { email, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashed_password = await this.hashPassword(password, salt);

        const username = email.split('@')[0]
        const user_exist = await this.userModel.findOne({ email })

        if (user_exist) {
            throw new ConflictException("User with this email already exist")
        } else {
            const user = new this.userModel({
                email,
                username,
                password: hashed_password
            })

            await user.save()
        }



    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }


    async signin(loginCredentialsDto: LoginCredentialsDto): Promise<string> {

        const { email, password } = loginCredentialsDto;

        const payload: Jwtpayload = { email }

        const user = await this.userModel.findOne({ email })

        if (!user) {
            throw new NotFoundException("Invalid Credentials");
        } else {
            const password_match = await bcrypt.compare(password, user.password)

            if (!password_match) {
                throw new NotFoundException("Invalid Credentials");
            }

            const access_Token = await this.jwtService.sign(payload)
            this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`)
            return access_Token
        }
    }

    async forgotPassword(credentials: Partial<LoginCredentialsDto>) {

        const { email } = credentials;

        const randomPasssword = randomstring.generate({
            length: 15,
            charset: 'alphabetic'
        })

        const salt = await bcrypt.genSalt();
        const password = await this.hashPassword(randomPasssword, salt)

        const user_exist = await this.userModel.findOneAndUpdate({ email }, { $set: { password } })


        if (!user_exist) {
            throw new NotFoundException("User with this email does not exist")
        }

        const data = await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Password',
            html: `<p>Hello, ${user_exist.username} ! Here is your temporary password: ${randomPasssword}.<br/><br/> 
                    Update your password using this password</p>`
        });

        if (data.response.includes('OK')) {
            return data;
        } else {
            throw new Error("failed to send email")
        }
    }

    async changePassword(credentials: Partial<LoginCredentialsDto>) {

        const { email, password, newPassword } = credentials

        const salt = await bcrypt.genSalt();
        const password_hash = await this.hashPassword(newPassword, salt)

        const user_exist = await this.userModel.findOne({ email })

        if (!user_exist) {
            throw new NotFoundException("user with this email does not exist")
        } else {
            const password_match = await bcrypt.compare(password, user_exist.password)

            if (!password_match) {
                throw new UnauthorizedException("Invalid credentials")
            } else {
                user_exist.password = password_hash
                await user_exist.save()
                console.log(await bcrypt.compare(newPassword, user_exist.password))
            }
        }
    }
}