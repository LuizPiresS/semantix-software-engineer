import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly customerService: CustomerService) {}

  async validateCustomer(email: string, password: string): Promise<any> {
    const customer = await this.customerService.findOneByEmail(email);
    if (!customer) {
      return null;
    }

    const isPasswordValid = compareSync(password, customer.password);

    if (!isPasswordValid) {
      return null;
    }
  }
}
