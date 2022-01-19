import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCustomerDto } from './dto/auth-customer.dto';

@ApiTags('Auth')
@Controller('customer/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  /**
   * @example { "email": "valid@email.com", "password": "validPassword" }
   */
  @ApiOperation({ summary: 'Customer Login' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Body() authCustomerDto: AuthCustomerDto) {
    return await this.authService.login(req.user);
  }
}
