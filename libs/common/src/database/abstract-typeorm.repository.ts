import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractTypeOrmDocument } from './abstract-typeorm.schema';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { AbstractTypeOrmInterfaceRepository } from './abstract-typeorm.interface';

@Injectable()
export abstract class AbstractTypeOrmRepository<
  TDocument extends AbstractTypeOrmDocument,
> implements AbstractTypeOrmInterfaceRepository<TDocument>
{
  constructor(private repository: Repository<TDocument>) {}

  public async save(data: DeepPartial<TDocument>): Promise<TDocument> {
    return await this.repository.save(data);
  }

  public async saveMany(data: DeepPartial<TDocument>[]): Promise<TDocument[]> {
    return this.repository.save(data);
  }

  public create(data: DeepPartial<TDocument>): TDocument {
    return this.repository.create(data);
  }

  public createMany(data: DeepPartial<TDocument>[]): TDocument[] {
    return this.repository.create(data);
  }

  public async findOneById(id: any): Promise<TDocument | null> {
    const options: FindOptionsWhere<TDocument> = {
      id: id,
    };
    return await this.repository.findOneBy(options);
  }

  public async findOne(
    filterCondition: FindOneOptions<TDocument>,
  ): Promise<TDocument | null> {
    return await this.repository.findOne(filterCondition);
  }

  public async findOneBy(
    whereCondition: FindOptionsWhere<TDocument>,
  ): Promise<TDocument | null> {
    return await this.repository.findOneBy(whereCondition);
  }

  public async findWithRelations(
    relations: FindManyOptions<TDocument>,
  ): Promise<TDocument[] | null> {
    return await this.repository.find(relations);
  }

  public async findAll(
    options?: FindManyOptions<TDocument>,
  ): Promise<TDocument[] | null> {
    return await this.repository.find(options);
  }

  public async remove(data: TDocument): Promise<TDocument> {
    return await this.repository.remove(data);
  }

  public async preload(entityLike: DeepPartial<TDocument>): Promise<TDocument> {
    return await this.repository.preload(entityLike);
  }

  public async findOneAndUpdate(
    options: FindOneOptions<TDocument>,
    update: DeepPartial<TDocument>,
  ): Promise<TDocument> {
    const document = await this.repository.findOne(options);
    if (!document) {
      throw new NotFoundException('Document not found.');
    }

    return await this.repository.save({
      id: document.id,
      ...update,
    });
  }
}
