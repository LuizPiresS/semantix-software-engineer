import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MessageHelper } from 'src/helpers/messages.helper';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const customer = await this.authService.validateCustomer(email, password);
    if (!customer) {
      throw new UnauthorizedException(MessageHelper.INVALID_CREDENTIALS);
    }

    return customer;
  }
}
