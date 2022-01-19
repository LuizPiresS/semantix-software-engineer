import { CustomerService } from './customer/customer.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entities/customer.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomerModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Customer]),
    AuthModule,
  ],
  controllers: [],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class AppModule {}
