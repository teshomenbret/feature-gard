import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToMany, 
    ManyToOne,
    CreateDateColumn,
    JoinColumn
 } from "typeorm";
import { FeatureEntity } from './feature.entity'

@Entity({ name: 'permissions' })
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'feature_id',nullable: true  })
    featureId?: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => FeatureEntity, (feature) => feature, { nullable: true })
    @JoinColumn({ name: 'feature_id' })
    feature?: FeatureEntity;
}
