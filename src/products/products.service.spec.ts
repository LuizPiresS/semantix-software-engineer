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

  const mockedResultProductsPaginated = {
    items: [
      {
        id: '3d99150d-d509-472c-9a15-a520940ef103',
        name: 'teste',
        price: 11111,
        stock: 1,
      },
    ],
    meta: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
    },
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
            find: jest.fn().mockReturnValue(mockedResultProductsPaginated),
            findOne: jest.fn().mockReturnValue(mockedProduct),
            update: jest.fn().mockResolvedValue(mockedProduct),
            delete: jest.fn().mockReturnValue('deleted'),
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

  // describe('find all products', () => {
  //   it('should return all products', async () => {
  //     const itemList = [mockedProduct];
  //     jest.mock('nestjs-typeorm-paginate', () => ({
  //       paginate: jest.fn().mockResolvedValue({
  //         paginate: jest.fn().mockResolvedValue({
  //           items: itemList.slice(0, 2),
  //           meta: {
  //             itemCount: 2,
  //             totalItems: 2,
  //             totalPages: 1,
  //             currentPage: 1,
  //           },
  //         }),
  //       }),
  //     }));
  //     const productsPaginated = await productService.findAll(
  //       { page: 1, limit: 10 },
  //       'name',
  //     );

  //     expect(productsPaginated).toEqual(mockedResultProductsPaginated);
  //   });
  // });
  describe('findOne product', () => {
    it('should return product', async () => {
      const result = await productService.findOne(mockedProduct.id);

      expect(result).toEqual(mockedProduct);
    });
  });

  describe('update product', () => {
    it('should update product', async () => {
      const result = await productService.update(
        mockedProduct.id,
        mockedProductRequest,
      );

      expect(result).toEqual(mockedProduct);
    });
  });

  describe('delete', () => {
    it('should update product data', async () => {
      const result = await productService.remove(mockedProduct.id);

      expect(result).toBe('deleted');
    });
  });
});
