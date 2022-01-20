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

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: +process.env.THROTTLER_TTL,
      limit: +process.env.THROTTLER_LIMIT,
    }),
    CustomerModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Customer]),
    AuthModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    CustomerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [CustomerService],
})
export class AppModule {}
