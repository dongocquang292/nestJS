import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from "class-transformer";
import { User } from '../entities/users.entity';
import { DefaultResponse } from 'src/docs/default/default-response.swagger';


export class GetAllUsersResponse extends DefaultResponse{
  data: User[]
}

export class GetUserInfoResponse extends DefaultResponse{ 
  data: User | null;
}

export class CreateUserResponse extends GetUserInfoResponse{}
export class UpdateUserResponse extends GetUserInfoResponse{}


