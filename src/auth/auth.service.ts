import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password } = authCredentialsDto;
        
        const user = new User()
        user.username = username;
        user.password = password;

        try {
            await user.save()
        } catch (error) {
            if(error.code === '23505'){
                throw new ConflictException("User with this name already exist");
            }else{
                throw new InternalServerErrorException()
            }
        }
    }
}
