import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";

export interface AbstractTypeOrmInterfaceRepository<T> {
    create(data: DeepPartial<T>): T;
    createMany(data: DeepPartial<T>[]): T[]
    save(data: DeepPartial<T>): Promise<T>
    saveMany(data: DeepPartial<T>[]): Promise<T[]>
    findOneById(id: string): Promise<T>
    findOne(filterCondition: FindOneOptions<T>): Promise<T>;
    findOneBy(whereCondition: FindOptionsWhere<T>): Promise<T>;
    findAll(options?: FindManyOptions<T>): Promise<T[]>
    remove(data: T): Promise<T>
    findWithRelations(relations: FindManyOptions<T>): Promise<T[]>
    preload(entityLike: DeepPartial<T>): Promise<T>
    findOneAndUpdate(options: FindOneOptions<T>, update: DeepPartial<T>): Promise<T>
}