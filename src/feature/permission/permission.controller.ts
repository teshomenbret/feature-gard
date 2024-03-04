import { Controller} from '@nestjs/common';
import { TypedRoute, TypedParam ,TypedBody } from "@nestia/core";
import {
    ManyRecordsResponse,
    ResponseWrap,
    SingleRecordResponse,
  } from '../../abstract/response.abstract';
import { PermissionService } from './permission.service';
import {PermissionDto} from '../dto/permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(
        private readonly permissionService: PermissionService
    ) {}
    
    /**
     * Create a new permission
     * @tag Permission
     * 
     * @param permissionDto
     */
    @TypedRoute.Post()
    create(@TypedBody() permissionDto: PermissionDto.Create): Promise<SingleRecordResponse<PermissionDto.Response>> {
        const entity = new PermissionDto.Root(permissionDto).getEntity();
        return this.permissionService.create(entity).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    /**
     * Get all permissions
     * @tag Permission
     * 
     */
    @TypedRoute.Get()
    findAll(): Promise<ManyRecordsResponse<PermissionDto.Response>> {
        return this.permissionService.findAll().then((permissions) => {
            return ResponseWrap.many(permissions.map(PermissionDto.createFromEntities));
        });
    }

    /**
     * Get a permission by id
     * @tag Permission
     * 
     * @param id
     */
    @TypedRoute.Get(':id')
    findOne(@TypedParam('id') id: string): Promise<SingleRecordResponse<PermissionDto.Response>> {
        return this.permissionService.findOne(+id).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    /**
     * Update a permission by id
     * @tag Permission
     * 
     * @param id
     */
    @TypedRoute.Patch(':id')
    update(@TypedParam('id') id: string, @TypedBody() permissionDto: PermissionDto.Update): Promise<SingleRecordResponse<PermissionDto.Response>> {
        const entity = new PermissionDto.Root(permissionDto).getEntity();
        return this.permissionService.update(+id, entity).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    /**
     * Delete a permission by id
     * @tag Permission
     * 
     * @param id
     */
    @TypedRoute.Delete(':id')
    remove(@TypedParam('id') id: string): Promise<SingleRecordResponse<PermissionDto.Response>> {
        return this.permissionService.remove(+id).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    /**
     * Get all permissions for a feature
     * @tag Permission
     * 
     * @param featureId
     */
    @TypedRoute.Post(':featureId')
    createForFeature(@TypedParam('featureId') featureId: string, @TypedBody() permissionDto: PermissionDto.Create): Promise<SingleRecordResponse<PermissionDto.Response>> {
        const entity = new PermissionDto.Root(permissionDto).getEntity();
        return this.permissionService.createForFeature(+featureId, entity).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    /**
     * Assign a permission to a feature
     * @tag Permission
     * 
     * @param featureId
     * @param permissionId
     */
    @TypedRoute.Patch(':featureId/:permissionId')
    assignToFeature(@TypedParam('featureId') featureId: string, @TypedParam('permissionId') permissionId: string): Promise<SingleRecordResponse<PermissionDto.Response>> {
        return this.permissionService.assignToFeature(+featureId, +permissionId).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

}
