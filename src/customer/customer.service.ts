import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CustomerService {
  logger = new Logger(CustomerService.name);
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponseDto> {
    try {
      this.logger.log('Creating customer');
      if (
        !createCustomerDto.name ||
        !createCustomerDto.email ||
        !createCustomerDto.password ||
        !createCustomerDto.phoneNumber
      ) {
        throw new BadRequestException('Missing data');
      }
      const response = await this.customerRepository.save(
        this.customerRepository.create(createCustomerDto),
      );
      const { email, name, phoneNumber } = response;
      const createCustomerResponseDto: CreateCustomerResponseDto = {
        email,
        name,
        phoneNumber,
      };
      return createCustomerResponseDto;
    } catch (error) {
      this.logger.error(error);
      throw new Error("Can't create customer");
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Customer>> {
    try {
      const queryBuilder =
        this.customerRepository.createQueryBuilder('customer');
      queryBuilder.select(['customer.id', 'customer.name', 'customer.email']);

      queryBuilder.orderBy('customer.name', 'ASC');

      return await paginate<Customer>(queryBuilder, options);
    } catch (error) {
      this.logger.error(error);
      throw new Error("Can't find all customers");
    }
  }

  async findOne(id: string): Promise<Customer> {
    try {
      return await this.customerRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
      throw new Error("Can't find customer");
    }
  }

  async findOneByEmail(email: string): Promise<Customer> {
    try {
      return await this.customerRepository.findOne({ email });
    } catch (error) {
      this.logger.error(error.stack);
      throw new Error("Can't find customer");
    }
  }
  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      return await this.customerRepository.update(id, updateCustomerDto);
    } catch (error) {
      this.logger.error(error);
      throw new Error("Can't update customer");
    }
  }

  async remove(id: string) {
    try {
      await this.customerRepository.delete(id);
      return 'deleted';
    } catch (error) {
      this.logger.error(error);
      throw new Error("Can't delete customer");
    }
  }
}
