import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from '../entities/module.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ModuleService {
    constructor(
        @InjectRepository(ModuleEntity)
        private moduleRepository: Repository<ModuleEntity>,
    ) { }

    create(moduleEntity: ModuleEntity) {
        return this.moduleRepository.save(moduleEntity);
    }

    findAll() {
        return this.moduleRepository.find();
    }

    findOne(id: number): Promise<ModuleEntity>{
        const module = this.moduleRepository.findOneBy({id})
        if (!module) {
            throw new NotFoundException('Module not found');
        }
        return module;
    }

   async update(id: number, moduleEntity: ModuleEntity) : Promise<ModuleEntity>{
        const module = await this.findOne(id);
        await this.moduleRepository.update(id, moduleEntity);
        return module;
    }

    async remove(id: number) : Promise<ModuleEntity>{
        const module = await this.findOne(id);
        await this.moduleRepository.delete(id);
        return module;
    }
}
