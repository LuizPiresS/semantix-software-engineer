import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';
import { MessageHelper } from '../../helpers/messages.helper';
import { RegexHelper } from '../../helpers/regex.helper';

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
  @Matches(RegexHelper.password, {
    message: MessageHelper.INVALID_PASSWORD,
  })
  password: string;

  role?: string;
}
