import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Jwtpayload } from "./jwt-payload.interface";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<User>);
    validate(payload: Jwtpayload): Promise<User>;
}
export {};
