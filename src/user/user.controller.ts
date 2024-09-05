import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
  return await this.userService.createUsers(createUserDto);
  }
  
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
}
