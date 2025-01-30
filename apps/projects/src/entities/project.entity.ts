import { AbstractTypeOrmDocument } from "@app/common"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Project extends AbstractTypeOrmDocument {
    @Column({
        type: 'varchar',
        length: 100,
    })
    name: string;
    
    @Column({
        type: 'varchar',
        length: 255,
    })
    description: string;

    @Column({
        type: 'uuid'
    })
    createdBy: string;

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

    @DeleteDateColumn({
        type: 'timestamp',
        default: null, // cannot have a default value since it will causepostgres to assume it has been deleted
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    deletedAt: Date;
}