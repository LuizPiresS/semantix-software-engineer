import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiTags('Products')
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiTags('Products')
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'number of products per page',
    example: 10,
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: String,
    description: 'Order by',
    example: 'name, price or stock',
  })
  @ApiOperation({ description: 'Find all customers' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: string,
  ) {
    return this.productsService.findAll({ page, limit }, orderBy);
  }

  @ApiTags('Products')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiTags('Products')
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiTags('Products')
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
