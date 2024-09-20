import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern , Payload } from "@nestjs/microservices";
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';

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

}
