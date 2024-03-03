import { Module } from '@nestjs/common';
import { FeatureService } from './feature/feature.service';
import { FeatureController } from './feature/feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FeatureEntity} from './entities/feature.entity';
import {RoleEntity} from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { ModuleEntity as ModuleEntity } from './entities/module.entity';
import { PermissionEntity } from './entities/permission.entity';
import { ModuleController } from './module/module.controller';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { ModuleService } from './module/module.service';
import { PermissionService } from './permission/permission.service';
import { PermissionController } from './permission/permission.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      FeatureEntity,
      RoleEntity,
      UserEntity, 
      ModuleEntity,
      PermissionEntity,
    ])
  ],
  controllers: [
      FeatureController, 
      ModuleController,
      RoleController,
      PermissionController,
      UserController,
    ],
  providers: [
      FeatureService, 
      RoleService, 
      ModuleService,
      PermissionService,
      UserService,
    ],
})
export class FeatureModule {}
