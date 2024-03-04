import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {FeatureEntity} from '../entities/feature.entity';
import {ModuleService} from '../module/module.service';


@Injectable()
export class FeatureService {

  constructor(
    @InjectRepository(FeatureEntity)
    private featureRepository: Repository<FeatureEntity>,

    private readonly moduleService: ModuleService
  ) { }

  create(featureEntity: FeatureEntity) {
    if(featureEntity.moduleId !== null && featureEntity.moduleId !== undefined) {
      return this.createForModule(featureEntity.moduleId, featureEntity);
    }
    return this.featureRepository.save(featureEntity);
  }

  async createForModule(moduleId: number, featureEntity: FeatureEntity) {
    const module = await this.moduleService.findOne(moduleId);
    featureEntity.module = module;
    featureEntity.moduleId = module.id;
    return this.featureRepository.save(featureEntity);
  }

  async assignToModule(moduleId: number, featureId: number) {
    const module = await this.moduleService.findOne(moduleId);
    const feature = await this.findOne(featureId);
    feature.module = module;
    feature.moduleId = module.id;
    return this.featureRepository.save(feature);
  }

  findAll() {
    return this.featureRepository.find();
  }

  async findOne(id: number) {
    const feature = await this.featureRepository.findOne({
      where: { id: id},
    });
    if (!feature) {
      throw new NotFoundException('Feature not found');
    }
    return feature;
  }

  async update(id: number, featureEntity: FeatureEntity): Promise<FeatureEntity> {
    await this.findOne(id);
    await this.featureRepository.update(id, featureEntity);
    return this.findOne(id);
  }

  async remove(id: number): Promise<FeatureEntity> {
    const feature = await this.findOne(id);
    await this.featureRepository.delete(id);
    return feature;
  }
}
