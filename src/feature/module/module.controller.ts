import { Controller} from '@nestjs/common';
import { TypedRoute, TypedParam ,TypedBody } from "@nestia/core";
import {
    ManyRecordsResponse,
    ResponseWrap,
    SingleRecordResponse,
  } from '../../abstract/response.abstract';
import { ModuleService } from './module.service';
import {ModuleDto} from '../dto/module.dto';

@Controller('module')
export class ModuleController {
    constructor(
        private readonly moduleService: ModuleService
    ) {}

    /**
     * Create a new module
     * @tag Module
     * 
     * @param moduleDto
     */
    @TypedRoute.Post()
    create(@TypedBody() moduleDto: ModuleDto.Create): Promise<SingleRecordResponse<ModuleDto.Response>> {
        const entity = new ModuleDto.Root(moduleDto).getEntity();
        return this.moduleService.create(entity).then((module) => {
            return ResponseWrap.single(ModuleDto.createFromEntities(module));
        });
    }
    /**
     * Get all modules
     * @tag Module
     * 
     * @param moduleDto
     */

    @TypedRoute.Get()
    findAll(): Promise<ManyRecordsResponse<ModuleDto.Response>> {
        return this.moduleService.findAll().then((modules) => {
            return ResponseWrap.many(modules.map(ModuleDto.createFromEntities));
        });
    }

    /**
     * Get a module by id
     * @tag Module
     * 
     * @param id
     */
    @TypedRoute.Get(':id')
    findOne(@TypedParam('id') id: string): Promise<SingleRecordResponse<ModuleDto.Response>> {
        return this.moduleService.findOne(+id).then((module) => {
            return ResponseWrap.single(ModuleDto.createFromEntities(module));
        });
    }

    /**
     * Update a module by id
     * @tag Module
     * 
     * @param id 
     * @param moduleDto 
     */
    @TypedRoute.Patch(':id')
    update(@TypedParam('id') id: string, @TypedBody() moduleDto: ModuleDto.Update): Promise<SingleRecordResponse<ModuleDto.Response>> {
        const entity = new ModuleDto.Root(moduleDto).getEntity();
        return this.moduleService.update(+id, entity).then((module) => {
            return ResponseWrap.single(ModuleDto.createFromEntities(module));
        });
    }

    /**
     * Delete a module by id
     * @tag Module
     * 
     * @param id
     */
    @TypedRoute.Delete(':id')
    remove(@TypedParam('id') id: string): Promise<SingleRecordResponse<ModuleDto.Response>> {
        return this.moduleService.remove(+id).then((module) => {
            return ResponseWrap.single(ModuleDto.createFromEntities(module));
        });
    }
}
