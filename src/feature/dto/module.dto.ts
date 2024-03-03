import { ModuleEntity} from '../entities/module.entity';
import { AbstractDto } from '../../abstract/abstract.dto';

export namespace ModuleDto {
    export class Root extends AbstractDto {
        key?: string;
        name: string;

        getEntity() {
            const entity = new ModuleEntity();
            entity.name = this.name;
            return entity;
        }
    }

    export function createFromEntities(entity: ModuleEntity) {
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