import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from "./user.entity"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { Jwtpayload } from "./jwt-payload.interface"
import * as config from 'config'
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectModel("User")
        private userModel: Model<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
        })
    }

    async validate(payload: Jwtpayload): Promise<User>{
        
        const { email } = payload
        const user = await this.userModel.findOne({ email })

        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }
}