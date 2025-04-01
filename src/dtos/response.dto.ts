import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ResponseDto {
  constructor(
    message: string,
    statusCode: number,
    data?: unknown,
    error?: string,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
  }

  @IsOptional()
  @IsString()
  error?: string;

  @IsString()
  message: string;

  @IsOptional()
  data?: unknown;

  @IsNumber()
  statusCode: number;
}
