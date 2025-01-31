import { AbstractTypeOrmDocument, Providers } from '@app/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['googleId', 'email', 'id'], { unique: true })
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

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
    select: false, // prevent this column/field to be selected when using find or QueryBuilder
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
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: null, // cannot have a default value since it will causepostgres to assume it has been deleted
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  deletedAt: Date;
}
