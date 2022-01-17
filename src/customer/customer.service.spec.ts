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
    const mockedCustomer = {
      id: 'valid uuid',
      name: 'valid name',
      email: 'valid@email.com',
      password: 'validPassword',
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

  describe('findAll', () => {
    it('should return all customers', async () => {
      const result = await customerService.findAll();

      expect(result).toEqual([mockedCustomer]);
    });
  });

  describe('findOne', () => {
    it('should return customer', async () => {
      const result = await customerService.findOne(mockedCustomer.id);

      expect(result).toEqual(mockedCustomer);
    });
  });
});
