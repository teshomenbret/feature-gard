import { FeatureEntity } from '../entities/feature.entity';
import { ModuleDto } from './module.dto';
import { AbstractDto } from '../../abstract/abstract.dto';


export namespace FeatureDto {
    export class Root extends AbstractDto {
        key?: string;
        name: string;
        moduleId?: number;
        module?: ModuleDto.Root;

        getEntity() {
            const entity = new FeatureEntity();
            entity.name = this.name;
            entity.moduleId = this.moduleId;
            entity.module = this.module?.getEntity();
            return entity;
        }
    }

    export function createFromEntities(entity: FeatureEntity) {
        const dto = new Root();
        dto.key = entity.id.toString();
        dto.name = entity.name;
        dto.moduleId = entity.moduleId?.valueOf();
        dto.module = entity.module ? ModuleDto.createFromEntities(entity.module) : undefined;
        return dto;
    }

    export type Create = Pick<
        Root,
        | 'name'
        | 'moduleId'
    >;
    export type Update = Partial<Create>;
    export type Response = Root;
}