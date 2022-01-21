import { CustomerService } from './customer/customer.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entities/customer.entity';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot({
      ttl: +process.env.THROTTLER_TTL,
      limit: +process.env.THROTTLER_LIMIT,
    }),

    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Customer]),
    TypeOrmModule.forFeature([Product]),

    CustomerModule,
    ProductsModule,
    AuthModule,
    ConfigModule,
  ],

  controllers: [],

  providers: [
    ProductsService,
    CustomerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [CustomerService, ProductsService],
})
export class AppModule {}
