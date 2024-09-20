import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
  return await this.userService.createUsers(createUserDto);
  }
  
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
  return await this.userService.findAllUsers();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
  return await this.userService.findOneUser(+id);
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto:
  UpdateUserDto) {
  return await this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
  return await this.userService.removeUser(+id);
  }

  @MessagePattern({ cmd: 'GET/USERS/ALL' })
  getUserAll(data: any) {
    return this.userService.findAllUsers();
  }

  @MessagePattern({ cmd: 'POST/USERS/CREATE' })
  createUser(@Payload() createUserDto: CreateUserDto) {
    return this.userService.createUsers(createUserDto);
  }
}
