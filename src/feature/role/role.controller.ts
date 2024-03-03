import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

    @Post()
    create(@Body() roleDto: RoleDto.Create): Promise<SingleRecordResponse<RoleDto.Response>> {
        const entity = new RoleDto.Root(roleDto).getEntity();
        return this.roleService.create(entity).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    @Get()
    findAll(): Promise<ManyRecordsResponse<RoleDto.Response>> {
        return this.roleService.findAll().then((roles) => {
            return ResponseWrap.many(roles.map(RoleDto.createFromEntities));
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<SingleRecordResponse<RoleDto.Response>> {
        return this.roleService.findOne(+id).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() roleDto: RoleDto.Update): Promise<SingleRecordResponse<RoleDto.Response>> {
        const entity = new RoleDto.Root(roleDto).getEntity();
        return this.roleService.update(+id, entity).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<SingleRecordResponse<RoleDto.Response>> {
        return this.roleService.remove(+id).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    @Post(':roleId/permission/:permissionId')
    assignPermissionToRole(@Param('roleId') roleId: string, @Param('permissionId') permissionId: string): Promise<SingleRecordResponse<RoleDto.Response>> {
        return this.roleService.assignPermissionToRole(+roleId, +permissionId).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

    @Delete(':roleId/permission/:permissionId')
    removePermissionFromRole(@Param('roleId') roleId: string, @Param('permissionId') permissionId: string): Promise<SingleRecordResponse<RoleDto.Response>> {
        return this.roleService.removePermissionFromRole(+roleId, +permissionId).then((role) => {
            return ResponseWrap.single(RoleDto.createFromEntities(role));
        });
    }

}
