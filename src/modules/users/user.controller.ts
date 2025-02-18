import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/users.entity';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DefaultResponse } from 'src/docs/default/default-response.swagger';
import { CreateUserResponse, GetAllUsersResponse, GetUserInfoResponse, UpdateUserResponse } from './response/user.response';
import { DefaultRequest } from 'src/docs/default/default-request.swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('allUsers')
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({type: GetAllUsersResponse})
  findAll() {
    return this.userService.findAll();
  }

  @Get("info")
  @ApiOperation({ summary: 'Get user info' })
  @ApiOkResponse({type: GetUserInfoResponse})
  getUserInfo(@Req() request: DefaultRequest) {
    return this.userService.findOne(request.id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({type: CreateUserResponse})
  create(@Body() body: UserDto) {
    return this.userService.create(body);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({type: UpdateUserResponse})
  update(@Req() request: DefaultRequest, @Body() body: UserDto) {
    return this.userService.update(request.id, body);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({type: DefaultResponse})
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
