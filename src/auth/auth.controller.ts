import { Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({ type: AuthCustomerDto })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }
}
