import {PermissionEntity} from '../entities/permission.entity';
import {AbstractDto} from '../../abstract/abstract.dto';

export namespace PermissionDto {
    export class Root extends AbstractDto {
        key?: string;
        name: string;
        featureId?: number;

        getEntity() {
            const entity = new PermissionEntity();
            entity.name = this.name;
            entity.featureId = this.featureId;
            return entity;
        }
    }

    export function createFromEntities(entity: PermissionEntity) {
        const dto = new Root();
        dto.key = entity.id.toString();
        dto.name = entity.name;
        dto.featureId = entity.featureId;
        return dto;
    }

    export type Create = Pick<
        Root,
        | 'name'
        | 'featureId'
    >;
    export type Update = Partial<Create>;
    export type Response = Root;
}