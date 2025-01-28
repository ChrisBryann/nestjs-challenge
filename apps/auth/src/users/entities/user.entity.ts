import { AbstractTypeOrmDocument, Providers } from "@app/common";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends AbstractTypeOrmDocument {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 20,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 20,
    })
    lastName: string;

    @Column({
        nullable: true,
    })
    googleId: string | null;

    @Column({unique: true})
    email: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    password: string | null;

    @Column({
        nullable: false,
        type: String,
        enum: Providers,
        default: Providers.None,
    })
    provider: Providers;

    @Column({
        default: 0,
    })
    tokenVersion?: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    refreshToken?: string;

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
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    deletedAt: Date;
}