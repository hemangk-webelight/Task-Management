import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/authCredentials.dto';

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

    @Post('/forgotPassword')
    async sendMailForPassword(@Body() credentials: Partial<LoginCredentialsDto>, @Res() res: Response){

        console.log("Body",credentials)
        await this.authService.forgotPassword(credentials)
        return res.status(200).json({message:'Mail sent, please check your email'})
    }

    @Post('/changePassword')
    async changePassword(@Body() credential: LoginCredentialsDto, @Res() res: Response){

        await this.authService.changePassword(credential)
        return res.status(200).json({message: 'credentials updated successfully'})
    }
}