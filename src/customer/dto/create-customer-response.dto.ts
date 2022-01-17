import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;
}
