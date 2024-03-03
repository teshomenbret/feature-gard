import {RoleEntity} from '../entities/role.entity';
import {AbstractDto} from '../../abstract/abstract.dto';

export namespace RoleDto {
    export class Root extends AbstractDto {
        key?: string;
        name: string;

        getEntity() {
            const entity = new RoleEntity();
            entity.name = this.name;
            return entity;
        }
    }

    export function createFromEntities(entity: RoleEntity) {
        const dto = new Root();
        dto.key = entity.id.toString();
        dto.name = entity.name;
        return dto;
    }

    export type Create = Pick<
        Root,
        |'name'
    >;
    export type Update = Partial<Create>;
    export type Response = Root;
}