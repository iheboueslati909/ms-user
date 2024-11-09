import { Controller , Post , Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { AuthResponse, LoginRequest, SignUpRequest } from 'src/proto/user-app';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @GrpcMethod('AuthService', 'SignUp')
    async signUp(@Payload() signupRequest: SignUpRequest): Promise<AuthResponse> {
      const result = await this.authService.signUp(signupRequest);
      return { token: result.token };
    }
  
    @GrpcMethod('UserService', 'Login')
    async login(@Payload() loginRequest: LoginRequest): Promise<AuthResponse> {
      const result = await this.authService.login(loginRequest);
      console.log("LOGIN CALLED")
      return { token: result.token };
    }
  }
