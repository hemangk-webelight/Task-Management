import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm"
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from "typeorm"
import { User } from "./user.entity"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { Jwtpayload } from "./jwt-payload.interface"
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
        })
    }

    async validate(payload: Jwtpayload): Promise<User>{
        const { username } = payload
        const user = await this.userRepository.findOne({where: { username }})

        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }
}