import { AbstractTypeOrmRepository } from "src/common/database/abstract-typeorm.repository";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AbstractTypeOrmInterfaceRepository } from "src/common/database/abstract-typeorm.interface";

export class UsersTypeOrmRepository extends AbstractTypeOrmRepository<User>{
    constructor(@InjectRepository(User) usersRepository: Repository<User>){
        super(usersRepository)
    }
}