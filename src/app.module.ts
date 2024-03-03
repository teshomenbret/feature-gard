import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureModule } from './feature/feature.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('database_host'),
        port: +config.get('database_port'),
        username: config.get('database_username'),
        password: config.get('database_password'),
        database: config.get('database_name'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    FeatureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
