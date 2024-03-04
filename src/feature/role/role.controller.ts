import { Controller} from '@nestjs/common';
import { TypedRoute, TypedParam ,TypedBody } from "@nestia/core";
import {
    ManyRecordsResponse,
    ResponseWrap,
    SingleRecordResponse,
  } from '../../abstract/response.abstract';
import { RoleService } from './role.service';
import {RoleDto} from '../dto/role.dto';

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) {}
    
    /**
     * Create a new role
     * @tag Role
     * 
     * @param roleDto
     */
    @TypedRoute.Post()
    create(@TypedBody() roleDto: RoleDto.Create): Promise<SingleRecordResponse<RoleDto.Response>> {
        const entity = new RoleDto.Root(roleDto).getEntity();
        return this.roleService.create(entity).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    /**
     * Get all roles
     * @tag Role
     * 
     */
    @TypedRoute.Get()
    findAll(): Promise<ManyRecordsResponse<RoleDto.Response>> {
        return this.roleService.findAll().then((roles) => {
            return ResponseWrap.many(roles.map(RoleDto.createFromEntities));
        });
    }

    /**
     * Get a role by id
     * @tag Role
     * 
     * @param id
     */
    @TypedRoute.Get(':id')
    findOne(@TypedParam('id') id: string): Promise<SingleRecordResponse<RoleDto.Response>> {
        return this.roleService.findOne(+id).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    /**
     * Update a role by id
     * @tag Role
     * 
     * @param id
     */
    @TypedRoute.Patch(':id')
    update(@TypedParam('id') id: string, @TypedBody() roleDto: RoleDto.Update): Promise<SingleRecordResponse<RoleDto.Response>> {
        const entity = new RoleDto.Root(roleDto).getEntity();
        return this.roleService.update(+id, entity).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    /**
     * Delete a role by id
     * @tag Role
     * 
     * @param id
     */
    @TypedRoute.Delete(':id')
    remove(@TypedParam('id') id: string): Promise<SingleRecordResponse<RoleDto.Response>> {
        return this.roleService.remove(+id).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    /**
     * Assign a permission to a role
     * @tag Role
     * 
     * @param roleId
     * @param permissionId
     */
    @TypedRoute.Post(':roleId/permission/:permissionId')
    assignPermissionToRole(@TypedParam('roleId') roleId: string, @TypedParam('permissionId') permissionId: string): Promise<SingleRecordResponse<RoleDto.Response>> {
        return this.roleService.assignPermissionToRole(+roleId, +permissionId).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    /**
     * Remove a permission from a role
     * @tag Role
     * 
     * @param roleId
     * @param permissionId
     */
    @TypedRoute.Delete(':roleId/permission/:permissionId')
    removePermissionFromRole(@TypedParam('roleId') roleId: string, @TypedParam('permissionId') permissionId: string): Promise<SingleRecordResponse<RoleDto.Response>> {
        return this.roleService.removePermissionFromRole(+roleId, +permissionId).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

}
