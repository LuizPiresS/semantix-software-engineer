import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: Repository<Customer>;
  const mockedCustomer = {
    id: 'valid uuid',
    name: 'valid name',
    email: 'valid@email.com',
    password: 'validPassword',
    phoneNumber: '53991826270',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            create: jest.fn().mockReturnValue(mockedCustomer),
            save: jest.fn().mockResolvedValue(mockedCustomer),
            find: jest.fn().mockReturnValue([mockedCustomer]),
            findOne: jest.fn().mockReturnValue(mockedCustomer),
            update: jest.fn().mockResolvedValue(mockedCustomer),
            delete: jest.fn().mockReturnValue('deleted'),
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<Repository<Customer>>(
      getRepositoryToken(Customer),
    );
  });

  it('should be defined', () => {
    expect(customerService).toBeDefined();
  });

  describe('create', () => {
    const mockedCustomer: CreateCustomerResponseDto = {
      name: 'valid name',
      email: 'valid@email.com',
      phoneNumber: '53991826270',
    };
    it('should must customer data after being registered', async () => {
      const mockRequest: CreateCustomerDto = {
        name: 'valid name',
        email: 'valid@email.com',
        password: 'validPassword',
        phoneNumber: '53991826270',
      };

      const result = await customerService.create(mockRequest);

      expect(result).toEqual(mockedCustomer);

      expect(customerRepository.create).toHaveBeenCalledTimes(1);
      expect(customerRepository.save).toHaveBeenCalledTimes(1);
      expect(customerRepository.create).toHaveBeenCalledWith(mockRequest);
    });

    it('should be throw if called with invalid name ', async () => {
      const mockRequest = {
        name: '',
        email: 'valid@email.com',
        password: 'validPassword',
        phoneNumber: '53991826270',
      } as CreateCustomerDto;

      const result = customerService.create(mockRequest);

      await expect(result).rejects.toThrow();
    });

    it('should be throw if called with invalid email ', async () => {
      const mockRequest = {
        name: 'valid name',
        email: '',
        password: 'validPassword',
        phoneNumber: '53991826270',
      } as CreateCustomerDto;

      const result = customerService.create(mockRequest);

      await expect(result).rejects.toThrow();
    });

    it('should be throw if called with invalid password ', async () => {
      const mockRequest = {
        name: 'valid name',
        email: 'valid@email.com',
        password: '',
        phoneNumber: '53991826270',
      } as CreateCustomerDto;

      const result = customerService.create(mockRequest);

      await expect(result).rejects.toThrow();
    });

    it('should be throw if called with invalid name ', async () => {
      const mockRequest = {
        name: 'valid name',
        email: 'valid@email.com',
        password: 'validPassword',
        phoneNumber: '',
      } as CreateCustomerDto;

      const result = customerService.create(mockRequest);

      await expect(result).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return customer', async () => {
      const result = await customerService.findOne(mockedCustomer.id);

      expect(result).toEqual(mockedCustomer);
    });
  });

  describe('update', () => {
    it('should update customer data', async () => {
      const updatedCustomerMock = {
        name: 'updated name',
        email: 'updated@email.com',
        password: 'updatedPassword',
        phoneNumber: 'updatedPhoneNumber',
      };
      const result = await customerService.update(
        mockedCustomer.id,
        updatedCustomerMock,
      );

      expect(result).toEqual(mockedCustomer);
    });
  });

  describe('update', () => {
    it('should update customer data', async () => {
      const result = await customerService.remove(mockedCustomer.id);

      expect(result).toBe('deleted');
    });
  });
});
