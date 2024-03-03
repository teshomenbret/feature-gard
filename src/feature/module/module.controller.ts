import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

    @Post()
    create(@Body() moduleDto: ModuleDto.Create): Promise<SingleRecordResponse<ModuleDto.Response>> {
        const entity = new ModuleDto.Root(moduleDto).getEntity();
        return this.moduleService.create(entity).then((module) => {
            return ResponseWrap.single(ModuleDto.createFromEntities(module));
        });
    }

    @Get()
    findAll(): Promise<ManyRecordsResponse<ModuleDto.Response>> {
        return this.moduleService.findAll().then((modules) => {
            return ResponseWrap.many(modules.map(ModuleDto.createFromEntities));
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<SingleRecordResponse<ModuleDto.Response>> {
        return this.moduleService.findOne(+id).then((module) => {
            return ResponseWrap.single(ModuleDto.createFromEntities(module));
        });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() moduleDto: ModuleDto.Update): Promise<SingleRecordResponse<ModuleDto.Response>> {
        const entity = new ModuleDto.Root(moduleDto).getEntity();
        return this.moduleService.update(+id, entity).then((module) => {
            return ResponseWrap.single(ModuleDto.createFromEntities(module));
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<SingleRecordResponse<ModuleDto.Response>> {
        return this.moduleService.remove(+id).then((module) => {
            return ResponseWrap.single(ModuleDto.createFromEntities(module));
        });
    }
}
