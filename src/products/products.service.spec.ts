import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;
  const mockedProduct: Product = {
    id: 'valid uuid',
    name: 'valid name',
    price: 1,
    stock: 1,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    deletedAt: null,
  };

  const mockedProductRequest: CreateProductDto = {
    name: 'valid name',
    price: 1,
    stock: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn().mockReturnValue(mockedProduct),
            save: jest.fn().mockResolvedValue(mockedProduct),
            find: jest.fn().mockReturnValue([mockedProduct]),
            findOne: jest.fn().mockReturnValue(mockedProduct),
            update: jest.fn().mockResolvedValue(mockedProduct),
            delete: jest.fn().mockReturnValue('deleted'),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create new product', () => {
    it('should return a product', async () => {
      const product = await service.create(mockedProductRequest);
      expect(product).toEqual(mockedProduct);
    });
  });
});
