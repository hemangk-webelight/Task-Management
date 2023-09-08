"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userModel, jwtService, mailerService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.logger = new common_1.Logger('AuthService');
    }
    async signup(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashed_password = await this.hashPassword(password, salt);
        const username = email.split('@')[0];
        const user_exist = await this.userModel.findOne({ email });
        if (user_exist) {
            throw new common_1.ConflictException("User with this email already exist");
        }
        else {
            const user = new this.userModel({
                email,
                username,
                password: hashed_password
            });
            await user.save();
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async signin(loginCredentialsDto) {
        const { email, password } = loginCredentialsDto;
        const payload = { email };
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.NotFoundException("Invalid Credentials");
        }
        else {
            const password_match = await bcrypt.compare(password, user.password);
            if (!password_match) {
                throw new common_1.NotFoundException("Invalid Credentials");
            }
            const access_Token = await this.jwtService.sign(payload);
            this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`);
            return access_Token;
        }
    }
    async forgotPassword(credentials) {
        const { email } = credentials;
        console.log("hello", email);
        const randomPasssword = randomstring.generate({
            length: 15,
            charset: 'alphabetic'
        });
        const salt = await bcrypt.genSalt();
        const password = await this.hashPassword(randomPasssword, salt);
        const user_exist = await this.userModel.findOneAndUpdate({ email }, { $set: { password } });
        if (!user_exist) {
            throw new common_1.NotFoundException("User with this email does not exist");
        }
        const data = await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Password',
            html: `<p>Hello, ${user_exist.username} ! Here is your temporary password: ${randomPasssword}.<br/><br/> Update your password using this password</p>`
        });
        if (data.response.includes('OK')) {
            return data;
        }
        else {
            throw new Error("failed to send email");
        }
    }
    async changePassword(credentials) {
        const { email, password, newPassword } = credentials;
        const salt = await bcrypt.genSalt();
        const password_hash = await this.hashPassword(newPassword, salt);
        const user_exist = await this.userModel.findOne({ email });
        if (!user_exist) {
            throw new common_1.NotFoundException("user with this email does not exist");
        }
        else {
            const password_match = await bcrypt.compare(password, user_exist.password);
            if (!password_match) {
                throw new common_1.UnauthorizedException("Invalid credentials");
            }
            else {
                user_exist.password = password_hash;
                await user_exist.save();
                console.log(await bcrypt.compare(newPassword, user_exist.password));
            }
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map