import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { PermissionService } from '../permission/permission.service';


@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,

        private readonly permissionService: PermissionService
    ) { }

    create(roleEntity: RoleEntity) {
        return this.roleRepository.save(roleEntity);
    }

    async assignPermissionToRole(roleId: number, permissionId: number) {
        const role = await this.findOne(roleId);
        const permission = await this.permissionService.findOne(permissionId);
        role.permissions.push(permission);
        return this.roleRepository.save(role);
    }

    findAll() {
        return this.roleRepository.find();
    }

    async findOne(id: number) {
        const role = await this.roleRepository.findOneBy({ id })
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }

    async update(id: number, roleEntity: RoleEntity): Promise<RoleEntity> {
        const role = await this.findOne(id);
        await this.roleRepository.update(id, roleEntity);
        return role;
    }

    async remove(id: number): Promise<RoleEntity> {
        const role = await this.findOne(id);
        await this.roleRepository.delete(id);
        return role;
    }

    async removePermissionFromRole(roleId: number, permissionId: number) {
        const role = await this._getRole(roleId, ['permissions']);
        const permission = await this.permissionService.findOne(permissionId);
        role.permissions = role.permissions.filter(p => p.id !== permission.id);
        return this.roleRepository.save(role);
    }

    async _getRole(id: number, relations: string[] = []): Promise<RoleEntity> {
        const options = {
            where: { id: id },
            relations,
        };
        if (relations.length) {
            options.relations = relations;
        }
        const role = await this.roleRepository.findOne(options);
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }
}
