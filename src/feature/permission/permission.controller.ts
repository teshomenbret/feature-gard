import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

    @Post()
    create(@Body() permissionDto: PermissionDto.Create): Promise<SingleRecordResponse<PermissionDto.Response>> {
        const entity = new PermissionDto.Root(permissionDto).getEntity();
        return this.permissionService.create(entity).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    @Get()
    findAll(): Promise<ManyRecordsResponse<PermissionDto.Response>> {
        return this.permissionService.findAll().then((permissions) => {
            return ResponseWrap.many(permissions.map(PermissionDto.createFromEntities));
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<SingleRecordResponse<PermissionDto.Response>> {
        return this.permissionService.findOne(+id).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() permissionDto: PermissionDto.Update): Promise<SingleRecordResponse<PermissionDto.Response>> {
        const entity = new PermissionDto.Root(permissionDto).getEntity();
        return this.permissionService.update(+id, entity).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<SingleRecordResponse<PermissionDto.Response>> {
        return this.permissionService.remove(+id).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    @Post(':featureId')
    createForFeature(@Param('featureId') featureId: string, @Body() permissionDto: PermissionDto.Create): Promise<SingleRecordResponse<PermissionDto.Response>> {
        const entity = new PermissionDto.Root(permissionDto).getEntity();
        return this.permissionService.createForFeature(+featureId, entity).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

    @Patch(':featureId/:permissionId')
    assignToFeature(@Param('featureId') featureId: string, @Param('permissionId') permissionId: string): Promise<SingleRecordResponse<PermissionDto.Response>> {
        return this.permissionService.assignToFeature(+featureId, +permissionId).then((permission) => {
            return ResponseWrap.single(PermissionDto.createFromEntities(permission));
        });
    }

}
