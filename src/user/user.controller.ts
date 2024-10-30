import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums/role.enum';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserRequest, UpdateUserRequest, DeleteUserRequest, FindUserByIdRequest, Empty } from '../proto/user-app';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async CreateUser(data: CreateUserRequest) {
    return await this.userService.createUsers(data);
  }

  //@Roles(Role.Admin)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @GrpcMethod('UserService', 'FindAllUsers')
  async FindAllUsers(data: Empty) {
    return await this.userService.findAllUsers();
  }

  @GrpcMethod('UserService', 'FindUserById')
  async FindUserById(data: FindUserByIdRequest) {
    const { id } = data;
    return await this.userService.findOneUser(id);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async UpdateUser(data: UpdateUserRequest) {
    return await this.userService.updateUser(data);
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async DeleteUser(data: DeleteUserRequest) {
    const { id } = data;
    return await this.userService.removeUser(id);
  }
}