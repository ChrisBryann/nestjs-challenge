import { AbstractTypeOrmDocument } from "@app/common"
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

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