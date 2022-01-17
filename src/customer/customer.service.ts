import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  logger = new Logger(CustomerService.name);
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    if (
      !createCustomerDto.name ||
      !createCustomerDto.email ||
      !createCustomerDto.password ||
      !createCustomerDto.phoneNumber
    ) {
      throw new BadRequestException('Missing data');
    }

    return this.customerRepository.save(
      this.customerRepository.create(createCustomerDto),
    );
  }

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    return await this.customerRepository.findOne(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
