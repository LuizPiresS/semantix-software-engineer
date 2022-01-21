import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      this.logger.log('creating product');

      const response = await this.productRepository.save(
        this.productRepository.create(createProductDto),
      );
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(
    options: IPaginationOptions,
    orderBy = 'name',
  ): Promise<Pagination<Product>> {
    try {
      this.logger.log('looking for all products');
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      queryBuilder.select([
        'product.id',
        'product.name',
        'product.price',
        'product.stock',
        'product.created_at',
      ]);

      queryBuilder.orderBy(`product.${orderBy}`, 'DESC');

      return await paginate<Product>(queryBuilder, options);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Can't find all products");
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log('looking for product with id: ', id);
      const product = await this.productRepository.findOne(id);
      if (!product) {
        this.logger.error(`Can't find product with id: ${id}`);
        throw new NotFoundException("Can't find product");
      }
      return product;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Can't find product");
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne(id);
      if (!product) {
        throw new NotFoundException("Can't find product");
      }
      await this.productRepository.update(id, updateProductDto);
      return await this.productRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Can't update product");
    }
  }

  async remove(id: string) {
    try {
      await this.productRepository.delete(id);
      return 'deleted';
    } catch (error) {
      this.logger.error(error);
      throw new Error("Can't delete product");
    }
  }
}
