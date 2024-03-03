import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToMany,
    JoinTable,
    CreateDateColumn 
} from "typeorm";

import { PermissionEntity } from "./permission.entity";

@Entity({ name: 'roles' })
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'name' })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => PermissionEntity)
    @JoinTable()
    permissions: PermissionEntity[]
}
