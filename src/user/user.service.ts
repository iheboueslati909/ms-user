import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserRequest, UpdateUserRequest, DeleteUserRequest,UserResponse, FindUserByIdRequest, Empty } from '../proto/user-app';
import { Role as ProtoRole } from '../proto/user-app'; // Import the Role enum from proto

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUsers(data: CreateUserRequest): Promise<UserResponse> {
    const user = new this.userModel({
      name: data.name,
      email: data.email,
      password: data.password,
      roles: data.roles,
    });
    const savedUser = await user.save();
    return this.toUserResponse(savedUser);
  }

  async findAllUsers(): Promise<UserResponse[]> {
    const users = await this.userModel.find();
    const usersResponse = users.map(user => this.toUserResponse(user));
    return {...usersResponse};
  }

  async findOneUser(id: string): Promise<UserResponse> {
    const user = await this.userModel.findById(id);
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.toUserResponse(user);
}

  async updateUser(data: UpdateUserRequest): Promise<UserResponse> {
    const id = data.id;
    const updatedUser = await this.userModel.findByIdAndUpdate(id, {
      name: data.name,
      email: data.email,
      password: data.password,
      roles: data.roles,
    }, { new: true });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.toUserResponse(updatedUser);
  }

  async removeUser(id: string): Promise<UserResponse> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.toUserResponse(deletedUser);
  }

  private toUserResponse(user: User): UserResponse {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      roles: user.roles.map(role => this.convertToProtoRole(role)), // Convert each role
    };
  }
  private convertToProtoRole(role: string): ProtoRole {
    role = role.toUpperCase();

    switch (role) {
        case 'USER':
            return ProtoRole.USER;
        case 'MANAGER':
            return ProtoRole.MANAGER;
        case 'ADMIN':
            return ProtoRole.ADMIN;
        
        default:
            throw new Error(`Unknown role: ${role}`);
    }
}
}
