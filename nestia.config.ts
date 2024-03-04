import { INestiaConfig } from '@nestia/sdk';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

const NESTIA_CONFIG: INestiaConfig = {
  // input: () => NestFactory.create(AppModule),
  input: async () => {
    const app = await NestFactory.create(AppModule);
    // app.setGlobalPrefix('api');
    // app.enableVersioning({
    //   type: VersioningType.URI,
    //   prefix: 'v',
    // });
    return app;
  },
  // input: ['src/controllers'],
  output: 'src/api',

  swagger: {
    output: 'packages/api/swagger.json',
    beautify: true,
    security: {
      web_refresh_token: {
        type: 'apiKey',
        name: '_refresh_token',
        in: 'cookie',
      },
      refresh_token: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      access_token: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    decompose: true,
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
  },
  distribute: 'packages/api',
  simulate: true,
};
export default NESTIA_CONFIG;