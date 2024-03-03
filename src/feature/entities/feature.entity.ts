import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToMany, 
    ManyToOne,
    CreateDateColumn,
    JoinColumn
 } from "typeorm";
import {ModuleEntity} from './module.entity'
import {PermissionEntity} from './permission.entity'

@Entity({ name: 'features' })
export class FeatureEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'module_id',nullable: true  })
    moduleId?: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => ModuleEntity, (module) => module, {nullable: true,})
    @JoinColumn({ name: 'module_id' })
    module?: ModuleEntity;

    @OneToMany(() => PermissionEntity, (permission) => permission.feature)
    permissions: PermissionEntity[];
}
