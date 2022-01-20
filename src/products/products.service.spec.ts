import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let productService: ProductsService;
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
            // find: jest.fn().mockReturnValue([mockedProduct]),
            // findOne: jest.fn().mockReturnValue(mockedProduct),
            // update: jest.fn().mockResolvedValue(mockedProduct),
            // delete: jest.fn().mockReturnValue('deleted'),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('create new product', () => {
    it('should return a product', async () => {
      const product = await productService.create(mockedProductRequest);
      expect(product).toEqual(mockedProduct);
    });

    it('should throw exception if invalid request', async () => {
      jest.spyOn(productService, 'create').mockRejectedValueOnce(new Error());
      const invalidRequest = {
        price: 1,
        stock: 1,
      } as CreateProductDto;
      await expect(
        productService.create(invalidRequest),
      ).rejects.toThrowError();
    });
  });

  describe('find all products', () => {
    it('should return all products', async () => {
      const products = await productService.findAll();
      expect(products).toEqual([
        { id: 'valid uuid', name: 'valid name', price: 1, stock: 1 },
        { id: 'valid uuid', name: 'valid name', price: 1, stock: 1 },
      ]);
    });
  });
});
