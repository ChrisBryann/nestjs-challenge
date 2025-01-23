import { Providers } from "src/common/enums/provider.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({
        type: String,
        enum: Providers,
        default: Providers.None,
    })
    provider: Providers;

    @Column({
        default: 0,
    })
    tokenVersion?: number;

    @Column()
    refreshToken?: string;
}