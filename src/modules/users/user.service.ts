import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { UserDto } from './dto/user.dto';
import {
  CreateUserResponse,
  GetAllUsersResponse,
  GetUserInfoResponse,
  UpdateUserResponse,
} from './response/user.response';
import { DefaultResponse } from 'src/docs/default/default-response.swagger';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: UserDto): Promise<CreateUserResponse> {
    try {
      const userExists = await this.userRepo.findOne({
        where: { email: createUserDto.email },
      });
      if (userExists) {
        throw new BadRequestException('User already exists');
      }
      const user = await this.userRepo.save(createUserDto);
      return { status: 200, message: 'User created successfully', data: user };
    } catch (error) {
      console.error('Error creating the user:', error.message);
      return { status: 400, message: 'Error creating the user', data: null };
    }
  }

  async findAll(): Promise<GetAllUsersResponse> {
    try {
      const users = await this.userRepo.find({ relations: ['books'] });
      return {
        status: 200,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      console.error('Error retrieving the users:', error.message);
      return { status: 400, message: 'Error retrieving the users', data: [] };
    }
  }

  async findOne(id: number): Promise<GetUserInfoResponse> {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
        relations: ['books'],
      });
      if (!user) throw new NotFoundException(`User with ID ${id} not found`);
      return {
        status: 200,
        message: 'User retrieved successfully',
        data: user,
      };
    } catch (error) {
      console.error('Error retrieving the user:', error.message);
      return { status: 400, message: 'Error retrieving the user', data: null };
    }
  }

  async update(id: number, payload: UserDto): Promise<UpdateUserResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) throw new NotFoundException(`User with ID ${id} not found`);
      const updatedUser = this.userRepo.merge(user, payload);
      const savedUser = await this.userRepo.save(updatedUser);
      return {
        status: 200,
        message: 'User updated successfully',
        data: savedUser,
      };
    } catch (error) {
      console.error('Error updating the user:', error.message);
      return { status: 400, message: 'Error updating the user', data: null };
    }
  }

  async remove(id: number): Promise<DefaultResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      await this.userRepo.remove(user);
      return { status: 200, message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting the user:', error.message);
      return { status: 400, message: 'Error deleting the user' };
    }
  }
}
