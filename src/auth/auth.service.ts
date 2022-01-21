import { Injectable, Logger } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(customer: Customer) {
    const payload = { sub: customer.id, email: customer.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }
  async validateCustomer(email: string, password: string): Promise<any> {
    const customer = await this.customerService.findOneByEmail(email);
    this.logger.log('validating customer');
    if (!customer) {
      return null;
    }

    const isPasswordValid = compareSync(password, customer.password);

    if (!isPasswordValid) {
      return null;
    }

    return customer;
  }
}
