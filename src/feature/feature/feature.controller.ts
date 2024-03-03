import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ManyRecordsResponse,
  ResponseWrap,
  SingleRecordResponse,
} from '../../abstract/response.abstract';
import { FeatureService } from './feature.service';
import {FeatureDto} from '../dto/feature.dto';

@Controller('feature')
export class FeatureController {
  constructor(
    private readonly featureService: FeatureService
    ) {}

  @Post()
  create(@Body() featureDto: FeatureDto.Create): Promise<SingleRecordResponse<FeatureDto.Response>> {
    const entity = new FeatureDto.Root(featureDto).getEntity();
    return this.featureService.create(entity).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  @Get()
  findAll(): Promise<ManyRecordsResponse<FeatureDto.Response>> {
    return this.featureService.findAll().then((features) => {
      return ResponseWrap.many(features.map(FeatureDto.createFromEntities));
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SingleRecordResponse<FeatureDto.Response>> {
    return this.featureService.findOne(+id).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() featureDto: FeatureDto.Update): Promise<SingleRecordResponse<FeatureDto.Response>> {
    const entity = new FeatureDto.Root(featureDto).getEntity();
    return this.featureService.update(+id, entity).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<SingleRecordResponse<FeatureDto.Response>> {
    return this.featureService.remove(+id).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  @Post(':moduleId')
  createForModule(@Param('moduleId') moduleId: string, @Body() featureDto: FeatureDto.Create): Promise<SingleRecordResponse<FeatureDto.Response>> {
    const entity = new FeatureDto.Root(featureDto).getEntity();
    return this.featureService.createForModule(+moduleId, entity).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  @Patch(':featureId/module/:moduleId')
  assignToModule(@Param('moduleId') moduleId: string, @Param('featureId') featureId: string): Promise<SingleRecordResponse<FeatureDto.Response>> {
    return this.featureService.assignToModule(+moduleId, +featureId).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }


}
