import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Semantix API')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  const logger = new Logger('Main');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
  logger.log(
    `Application is running in -->production<-- mod: ${configService.isProduction()}`,
  );
}

bootstrap();
