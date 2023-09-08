import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/authCredentials.dto';
import { Jwtpayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService')

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        const { username, password } = authCredentialsDto;

        const user = new User()
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save()
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException("User with this name already exist");
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }


    async signin(loginCredentialsDto: LoginCredentialsDto): Promise<string> {

        const { username, password } = loginCredentialsDto;

        const payload: Jwtpayload = { username }

        const user = await this.userRepository.findOne({ where: { username } })

        if (!user) {
            throw new NotFoundException("Invalid Credentials");
        } else {
            const password_match = await bcrypt.compare(password, user.password)

            if (!password_match) {
                throw new NotFoundException("Invalid Credentials");
            }

            const access_Token = await this.jwtService.sign(payload)
            this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`)
            return  access_Token 
        }
    }
}