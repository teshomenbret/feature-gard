import {UserEntity} from '../entities/user.entity';
import {AbstractDto} from '../../abstract/abstract.dto';

export namespace UserDto {
    export class Root extends AbstractDto {
        key?: string;
        systemId: string;
        firstName?: string;
        middleName?: string;
        lastName?: string;

        getEntity() {
            const entity = new UserEntity();
            entity.systemId = this.systemId;
            entity.firstName = this.firstName;
            entity.middleName = this.middleName;
            entity.lastName = this.lastName;

            return entity;
        }
    }

    export function createFromEntities(entity: UserEntity) {
        const dto = new Root();
        dto.key = entity.id.toString();
        dto.systemId = entity.systemId;
        dto.firstName = entity.firstName;
        dto.middleName = entity.middleName;
        dto.lastName = entity.lastName;

        return dto;
    }

    export type Create = Pick<
        Root,
        | 'systemId'
        | 'firstName'
        | 'middleName'
        | 'lastName'
    >;
    export type Update = Partial<Create>;
    export type Response = Root;
}