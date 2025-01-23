import { AbstractTypeOrmDocument } from "src/common/database/abstract-typeorm.schema";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Task extends AbstractTypeOrmDocument {
    @ManyToOne((type) => Project, {
        onDelete: 'CASCADE',
    })
    @JoinColumn() // doesn't have a null column, so by default it is NOT NULL? also, this creates projectId column in database
    project: Project;

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