import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  //@example 400
  statusCode: number;

  message?: string;

  //@example "Bad Request"
  error?: string;
}

export class NotFoundResponse {
  //@example 404
  statusCode: number;

  message?: string;

  //@example "Not Found"
  error?: string;
}

export class UnauthorizedResponse {
  //@example 401
  status: number;

  //@example Unauthorize
  message: string;
}

export class InternalServerErrorResponse {
  //@example 500
  statusCode: number;

  message?: string;

  //@example "Internal Server Error"
  error?: string;
}

export class DefaultResponse {
  //Response status code
  @ApiProperty({ example: 200 })
  status: number;

  //Response message
  @ApiProperty()
  message?: string;
}

export class DefaultPaginationResponse {
  currentPage: number;
  perPage: number;
  totalPage: number;
  totalResult: number;
}
