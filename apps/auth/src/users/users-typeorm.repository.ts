import { AbstractTypeOrmRepository } from "@app/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AbstractTypeOrmInterfaceRepository } from "@app/common";

export class UsersTypeOrmRepository extends AbstractTypeOrmRepository<User>{
    constructor(@InjectRepository(User) usersRepository: Repository<User>){
        super(usersRepository)
    }
}