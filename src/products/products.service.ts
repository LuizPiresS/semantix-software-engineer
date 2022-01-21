import {
  Injectable,
  InternalServerErrorException,
  Logger,
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
    this.logger.log('createProductDto', createProductDto);
    try {
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
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      queryBuilder.select([
        'product.id',
        'product.name',
        'product.price',
        'product.stock',
      ]);

      queryBuilder.orderBy(`product.${orderBy}`, 'ASC');

      return await paginate<Product>(queryBuilder, options);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Can't find all products");
    }
  }

  async findOne(id: string) {
    try {
      return await this.productRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Can't find product");
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
