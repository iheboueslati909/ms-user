import { Controller , Post , Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupDto: SignUpDto) {
    const result = await this.authService.signUp(signupDto);
    console.log("")
  }

  @Post('login')
  signin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

}
