import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
