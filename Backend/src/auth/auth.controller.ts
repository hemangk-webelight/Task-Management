import { Body, Controller, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/authCredentials.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signup(
        @Body() authCredentialsDto: AuthCredentialsDto,
        @Res() res: Response): Promise<Response> {
            
        const new_User = await this.authService.signup(authCredentialsDto)

        return res.status(201).json({
            message: "Sign up is Successfull"
        })
    }

    @Post('/signin')
    async signin(
        @Body() loginCredentialsDto: LoginCredentialsDto,
        @Res() res: Response) {

        const token = await this.authService.signin(loginCredentialsDto)

        return res.status(200).json({message: "Login Successfull", token})
    }

    @Post('test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user)
    }
}