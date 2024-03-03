import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
    ManyRecordsResponse,
    ResponseWrap,
    SingleRecordResponse,
  } from '../../abstract/response.abstract';
import { UserService } from './user.service';
import {UserDto} from '../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    create(@Body() userDto: UserDto.Create): Promise<SingleRecordResponse<UserDto.Response>> {
        const entity = new UserDto.Root(userDto).getEntity();
        return this.userService.create(entity).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    @Get()
    findAll(): Promise<ManyRecordsResponse<UserDto.Response>> {
        return this.userService.findAll().then((users) => {
            return ResponseWrap.many(users.map(UserDto.createFromEntities));
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.findOne(+id).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto.Update): Promise<SingleRecordResponse<UserDto.Response>> {
        const entity = new UserDto.Root(userDto).getEntity();
        return this.userService.update(+id, entity).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.remove(+id).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    @Post(':userId/role/:roleId')
    assignRoleToUser(@Param('userId') userId: string, @Param('roleId') roleId: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.assignRoleToUser(+userId, +roleId).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    @Delete(':userId/role/:roleId')
    removeRoleFromUser(@Param('userId') userId: string, @Param('roleId') roleId: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.removeRoleFromUser(+userId, +roleId).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    @Post(':userId/permission/:permissionId')
    assignPermissionToUser(@Param('userId') userId: string, @Param('permissionId') permissionId: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.assignPermissionToUser(+userId, +permissionId).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    @Delete(':userId/permission/:permissionId')
    removePermissionFromUser(@Param('userId') userId: string, @Param('permissionId') permissionId: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.removePermissionFromUser(+userId, +permissionId).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }
}