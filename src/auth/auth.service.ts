import { BadRequestException, Injectable ,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { LoginRequest, SignUpRequest } from 'src/proto/user-app';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signUp(signupRequest: SignUpRequest) {
        const { name, email, password, roles } = signupRequest;

        if ((!name) || (!email) || (!password)) 
            throw new BadRequestException('Missing informations');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            roles
        });

        await user.save();

        const token = await this.jwtService.sign(
            { id: user.id , roles:user.roles},
            {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_EXPIRES'),
            },
        );
        return { token };
    }

    async login(loginRequest: LoginRequest) {
        const { email, password } = loginRequest;
        if (!email || !password) {
            throw new BadRequestException('missing informations');
        }
        const user = await this.userModel.findOne({
            email,
        });

        if (!user) 
            throw new UnauthorizedException('invalid email or password');
        const passwordMatch = await bcrypt.compare(password,
            user.password);
        if (!passwordMatch)
            throw new UnauthorizedException('invalid email or password');
        const token = await this.jwtService.sign(
            { id: user.id, roles:user.roles },
            {
                secret: this.configService.get('JWT_SECRET'),
            },
        );
        return { token };
    }
}
