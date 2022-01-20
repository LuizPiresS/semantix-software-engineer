import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  logger = new Logger(ProductsService.name);
  create(createProductDto: CreateProductDto) {
    this.logger.log('createProductDto', createProductDto);
    return {
      id: 'valid uuid',
      name: 'valid name',
      price: 1,
      stock: 1,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      deletedAt: null,
    };
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
