import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCustomerDto {
  @ApiProperty()
  @IsEmail()
  static email: string;

  @ApiProperty()
  @IsNotEmpty()
  static password: string;
}
