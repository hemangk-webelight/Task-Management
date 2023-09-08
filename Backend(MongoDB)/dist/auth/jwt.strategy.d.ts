import { User } from "./user.entity";
import { Jwtpayload } from "./jwt-payload.interface";
import { Model } from "mongoose";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(userModel: Model<User>);
    validate(payload: Jwtpayload): Promise<User>;
}
export {};
