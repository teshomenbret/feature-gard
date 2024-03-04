import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RoleService } from '../role/role.service';
import {PermissionService} from '../permission/permission.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService
    ) { }
    
    create(userEntity: UserEntity) {
        return this.userRepository.save(userEntity);
    }

    async assignRoleToUser(userId: number, roleId: number) {
        const user = await this.findOne(userId);
        const role = await this.roleService.findOne(roleId);
        user.roles.push(role);
        return this.userRepository.save(user);
    }

    async assignPermissionToUser(userId: number, permissionId: number) {
        const user = await this.findOne(userId);
        const permission = await this.permissionService.findOne(permissionId);
        user.permissions.push(permission);
        return this.userRepository.save(user);
    }
    
    findAll() {
        return this.userRepository.find();
    }
    
    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({id})
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: number, userEntity: UserEntity): Promise<UserEntity> {
        const user = await this.findOne(id);
        await this.userRepository.update(id, userEntity);
        return user;
    }
    
    async remove(id: number): Promise<UserEntity> {
        const user = await this.findOne(id);
        await this.userRepository.delete(id);
        return user;
    }

   async removeRoleFromUser(userId: number, roleId: number) {
        const user =   await this._getUser(userId, ['roles']);
        user.roles = user.roles.filter(role => role.id !== roleId);
        return this.userRepository.save(user);
    }

    async removePermissionFromUser(userId: number, permissionId: number) {
       const user =   await this._getUser(userId, ['permissions']);
        user.permissions = user.permissions.filter(permission => permission.id !== permissionId);
        return this.userRepository.save(user);
    }

    async _getUser(id: number, relations: string[] = []) {
        const options = {
          where: { id: id },
          relations,
        };
        if (relations.length) {
          options.relations = relations;
        }
        const user = await this.userRepository.findOne(options);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
    }
}
