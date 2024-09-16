import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from "@nestjs/microservices";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  getHello(): string {
    console.log("aaaa")
    return this.appService.getHello();
  }
  @MessagePattern({ cmd: "ping" })
  ping(_: any) {
    console.log("bbb")
    return of("pong").pipe(delay(1000));
  }
}
