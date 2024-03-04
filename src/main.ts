import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
// import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   prefix: 'v',
  // });
  // app.use(cookieParser());

  const docs = await import('../packages/api/swagger.json') as any;
  SwaggerModule.setup('docs', app, docs, {
    swaggerOptions: {},
  });

  await app.listen(3000);


}
bootstrap();
