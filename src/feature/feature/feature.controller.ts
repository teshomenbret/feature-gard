import { Controller} from '@nestjs/common';
import { TypedRoute, TypedParam ,TypedBody } from "@nestia/core";
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

  /**
   * Create a new feature
   * @tag Feature
   * 
   * @param featureDto 
   */
  @TypedRoute.Post()
  create(@TypedBody() featureDto: FeatureDto.Create): Promise<SingleRecordResponse<FeatureDto.Response>> {
    const entity = new FeatureDto.Root(featureDto).getEntity();
    return this.featureService.create(entity).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  /**
   * Get all features
   * @tag Feature
   * 
   */
  @TypedRoute.Get()
  findAll(): Promise<ManyRecordsResponse<FeatureDto.Response>> {
    return this.featureService.findAll().then((features) => {
      return ResponseWrap.many(features.map(FeatureDto.createFromEntities));
    });
  }

  /**
   * Get a feature by id
   * @tag Feature
   * 
   * @param id
   */
  @TypedRoute.Get(':id')
  findOne(@TypedParam('id') id: string): Promise<SingleRecordResponse<FeatureDto.Response>> {
    return this.featureService.findOne(+id).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  /**
   * Update a feature by id
   * @tag Feature
   * 
   * @param id 
   * @param featureDto 
   */
  @TypedRoute.Patch(':id')
  update(@TypedParam('id') id: string, @TypedBody() featureDto: FeatureDto.Update): Promise<SingleRecordResponse<FeatureDto.Response>> {
    const entity = new FeatureDto.Root(featureDto).getEntity();
    return this.featureService.update(+id, entity).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  /**
   * Delete a feature by id
   * @tag Feature
   * 
   * @param id 
   */

  @TypedRoute.Delete(':id')
  remove(@TypedParam('id') id: string): Promise<SingleRecordResponse<FeatureDto.Response>> {
    return this.featureService.remove(+id).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  /**
   * Create a new feature for a module
   * @tag Feature
   * 
   * @param moduleId 
   * @param featureDto 
   */
  @TypedRoute.Post(':moduleId')
  createForModule(@TypedParam('moduleId') moduleId: string, @TypedBody() featureDto: FeatureDto.Create): Promise<SingleRecordResponse<FeatureDto.Response>> {
    const entity = new FeatureDto.Root(featureDto).getEntity();
    return this.featureService.createForModule(+moduleId, entity).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }

  /**
   * Assign a feature to a module
   * @tag Feature
   * 
   * @param moduleId 
   * @param featureId 
   */
  @TypedRoute.Post(':moduleId/:featureId')
  assignToModule(@TypedParam('moduleId') moduleId: string, @TypedParam('featureId') featureId: string): Promise<SingleRecordResponse<FeatureDto.Response>> {
    return this.featureService.assignToModule(+moduleId, +featureId).then((feature) => {
      return ResponseWrap.single(FeatureDto.createFromEntities(feature));
    });
  }


}
