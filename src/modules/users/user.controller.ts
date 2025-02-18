import { Controller, Get, Post, Put, Delete, Body, Param, Req, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DefaultResponse } from 'src/docs/default/default-response.swagger';
import { CreateUserResponse, GetAllUsersResponse, GetUserInfoResponse, UpdateUserResponse } from './response/user.response';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('allUsers')
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: GetAllUsersResponse })
  findAll() {
    return this.userService.findAll();
  }

  @Get('info/:id')
  @ApiOperation({ summary: 'Get user info' })
  @ApiOkResponse({ type: GetUserInfoResponse })
  getUserInfo(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ type: CreateUserResponse })
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UpdateUserResponse })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ type: DefaultResponse })
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
