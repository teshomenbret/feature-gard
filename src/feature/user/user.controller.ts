import { Controller} from '@nestjs/common';
import { TypedRoute, TypedParam ,TypedBody } from "@nestia/core";
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

    /**
     * Create a new user
     * @tag User
     * 
     * @param userDto
     */
    @TypedRoute.Post()
    create(@TypedBody() userDto: UserDto.Create): Promise<SingleRecordResponse<UserDto.Response>> {
        const entity = new UserDto.Root(userDto).getEntity();
        return this.userService.create(entity).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    /**
     * Get all users
     * @tag User
     * 
     */
    @TypedRoute.Get()
    findAll(): Promise<ManyRecordsResponse<UserDto.Response>> {
        return this.userService.findAll().then((users) => {
            return ResponseWrap.many(users.map(UserDto.createFromEntities));
        });
    }

    /**
     * Get a user by id
     * @tag User
     * 
     * @param id
     */
    @TypedRoute.Get(':id')
    findOne(@TypedParam('id') id: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.findOne(+id).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    /**
     * Update a user by id
     * @tag User
     * 
     * @param id
     */
    @TypedRoute.Patch(':id')
    update(@TypedParam('id') id: string, @TypedBody() userDto: UserDto.Update): Promise<SingleRecordResponse<UserDto.Response>> {
        const entity = new UserDto.Root(userDto).getEntity();
        return this.userService.update(+id, entity).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    /**
     * Remove a user by id
     * @tag User
     * 
     * @param id
     */
    @TypedRoute.Delete(':id')
    remove(@TypedParam('id') id: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.remove(+id).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    /**
     * Assign a role to a user
     * @tag User
     * 
     * @param userId
     * @param roleId
     */
    @TypedRoute.Post(':userId/role/:roleId')
    assignRoleToUser(@TypedParam('userId') userId: string, @TypedParam('roleId') roleId: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.assignRoleToUser(+userId, +roleId).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    /**
     * Remove a role from a user
     * @tag User
     * 
     * @param userId
     * @param roleId
     */
    @TypedRoute.Delete(':userId/role/:roleId')
    removeRoleFromUser(@TypedParam('userId') userId: string, @TypedParam('roleId') roleId: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.removeRoleFromUser(+userId, +roleId).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    /**
     * Assign a permission to a user
     * @tag User
     * 
     * @param userId
     * @param permissionId
     */
    @TypedRoute.Post(':userId/permission/:permissionId')
    assignPermissionToUser(@TypedParam('userId') userId: string, @TypedParam('permissionId') permissionId: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.assignPermissionToUser(+userId, +permissionId).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }

    /**
     * Remove a permission from a user
     * @tag User
     * 
     * @param userId
     * @param permissionId
     */
    @TypedRoute.Delete(':userId/permission/:permissionId')
    removePermissionFromUser(@TypedParam('userId') userId: string, @TypedParam('permissionId') permissionId: string): Promise<SingleRecordResponse<UserDto.Response>> {
        return this.userService.removePermissionFromUser(+userId, +permissionId).then((user) => {
            return ResponseWrap.single(UserDto.createFromEntities(user));
        });
    }
}