import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get("/")
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'GET/USERS/ALL' })
  getUserAll(data: any) {
    return this.userService.findAllUsers();
  }
}
