import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import {FeatureService} from '../feature/feature.service';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(PermissionEntity)
        private permissionRepository: Repository<PermissionEntity>,

        private readonly featureService: FeatureService
    ){}


    create(moduleEntity: PermissionEntity) {
        return this.permissionRepository.save(moduleEntity);
    }

    async createForFeature(featureId: number, permissionEntity: PermissionEntity) {
        const feature = await this.featureService.findOne(featureId);
        permissionEntity.feature = feature;
        permissionEntity.featureId = feature.id;
        return this.permissionRepository.save(permissionEntity);
    }

    async assignToFeature(featureId: number, permissionId: number) {
        const feature = await this.featureService.findOne(featureId);
        const permission = await this.findOne(permissionId);
        permission.feature = feature;
        permission.featureId = feature.id;
        return this.permissionRepository.save(permission);
    }

    findAll() {
        return this.permissionRepository.find();
    }

    async findOne(id: number): Promise<PermissionEntity>{
        const permission = await this.permissionRepository.findOneBy({id})
        if (!permission) {
            throw new NotFoundException('Permission not found');
        }
        return permission;
    }

    async update(id: number, moduleEntity: PermissionEntity): Promise<PermissionEntity> {
        const permission = await this.findOne(id);
        await this.permissionRepository.update(id, moduleEntity);
        return permission;
       
    }

    async remove(id: number): Promise<PermissionEntity> {
        const permission = await this.findOne(id);
        await this.permissionRepository.delete(id);
        return permission;
    }
}
