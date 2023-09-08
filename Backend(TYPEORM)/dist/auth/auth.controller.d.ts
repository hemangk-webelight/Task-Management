import { AuthService } from './auth.service';
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/authCredentials.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(authCredentialsDto: AuthCredentialsDto, res: Response): Promise<Response>;
    signin(loginCredentialsDto: LoginCredentialsDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
