import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AbstractTypeOrmDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
