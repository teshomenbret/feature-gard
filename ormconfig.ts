import { DataSource } from 'typeorm';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

const configService = new ConfigService(dotenv.config());

let ssl_extra = {};
if (configService.get('database_ssl_cert_path')) {
  ssl_extra = {
    ca: fs.readFileSync(configService.get('database_ssl_cert_path').toString()),
    rejectUnauthorized: configService.get('ENV_NAME') == 'prod',
  };
}

export const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get('database_host'),
  port: configService.get('database_port'),
  username: configService.get('database_username'),
  password: configService.get('database_password'),
  database: configService.get('database_name'),
  entities: [[__dirname, '**', '*.entity.{ts,js}'].join('/')],
  migrations: [[__dirname, 'migrations', '*.{ts,js}'].join('/')],
  autoLoadEntities: true,
  synchronize: true,
} as any);

configService.set('database', dataSource);
