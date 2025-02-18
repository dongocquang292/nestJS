import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { swaggerOptions } from './docs/swagger.config';
import { createDocument } from './docs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(process.env.API_ENDPOINT_PREFIX || 'api');
  SwaggerModule.setup(
    `${process.env.API_ENDPOINT_PREFIX || 'api'}/docs`,
    app,
    createDocument(app),
    swaggerOptions,
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // tự động chuyển dữ liệu đầu vào dựa trên DTO
      whitelist: true, // tự động loại bỏ dữ liệu đầu vào không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // nếu dữ liệu đầu vào không được định nghĩa trong DTO thì sẽ báo lỗi
    }),
  );
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: '*',
    credentials: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // tạo container để xử lý lỗi khi xử dụng class-validator
  await app.listen(process.env.PORT || 3000);
  console.log(`API listen at port: ${process.env.PORT || 3000}`);
}
bootstrap();
