import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod, MessagePattern , Payload } from "@nestjs/microservices";
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @GrpcMethod('HealthCheck', 'Check')
  check(): { healthy: boolean } {
    return { healthy: true };
  }

}
