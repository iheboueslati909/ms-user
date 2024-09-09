import { Injectable ,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/user/enums/role.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signUp(signupDto: SignUpDto) {
        const { name, email, password, roles } = signupDto;

        if ((!name) || (!email) || (!password)) 
            throw new UnauthorizedException('Missing informations');

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

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
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
