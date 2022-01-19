import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './../customer/customer.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    CustomerModule,
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
