import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToMany,
    JoinTable,
    CreateDateColumn 
} from "typeorm";import { RoleEntity } from "./role.entity";

import { PermissionEntity } from "./permission.entity";


@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'system_id' })
    systemId: string;

    @Column({ name: 'first_name', nullable: true  })
    firstName?: string;

    @Column({ name: 'middle_name', nullable: true  })
    middleName?: string;

    @Column({ name: 'last_name' , nullable: true  })
    lastName?: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => RoleEntity)
    @JoinTable()
    roles: RoleEntity[]

    @ManyToMany(() => PermissionEntity)
    @JoinTable()
    permissions: PermissionEntity[]
}
