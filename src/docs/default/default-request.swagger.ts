import { IsNumber } from 'class-validator';

export class DefaultRequest {
  @IsNumber()
  id: number;
}
