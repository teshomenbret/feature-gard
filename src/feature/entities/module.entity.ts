import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import {FeatureEntity} from './feature.entity'

@Entity({ name: 'modules' })
export class ModuleEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'name' })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => FeatureEntity, (feature) => feature.module)
    feature: FeatureEntity[];
}
