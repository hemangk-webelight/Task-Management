import { MailerService } from '@nestjs-modules/mailer';
import { User } from './user.entity';
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/authCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
export declare class AuthService {
    private userModel;
    private jwtService;
    private mailerService;
    private logger;
    constructor(userModel: Model<User>, jwtService: JwtService, mailerService: MailerService);
    signup(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    private hashPassword;
    signin(loginCredentialsDto: LoginCredentialsDto): Promise<string>;
    forgotPassword(credentials: Partial<LoginCredentialsDto>): Promise<any>;
    changePassword(credentials: Partial<LoginCredentialsDto>): Promise<void>;
}
