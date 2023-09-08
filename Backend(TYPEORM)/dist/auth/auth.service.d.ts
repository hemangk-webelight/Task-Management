import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/authCredentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private logger;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signup(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    private hashPassword;
    signin(loginCredentialsDto: LoginCredentialsDto): Promise<string>;
}
