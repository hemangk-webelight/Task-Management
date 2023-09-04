import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { User } from './user.entity';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(authCredentialsDto: AuthCredentialsDto, res: Response): Promise<Response>;
    signin(authCredentialsDto: AuthCredentialsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    test(user: User): void;
}
