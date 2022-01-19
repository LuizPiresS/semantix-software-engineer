import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('customer/auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login() {
    return null;
  }
}
