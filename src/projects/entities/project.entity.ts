import { AbstractTypeOrmDocument } from "src/common/database/abstract-typeorm.schema";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class Project extends AbstractTypeOrmDocument {
    @Column()
    name: string;
    
    @Column()
    description: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;
}