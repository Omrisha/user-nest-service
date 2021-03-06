import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    fullName: string;

    @Column({ length: 25 })
    username: string;

    @Column()
    password: string;

    @Column('datetime')
    birthDate: Date;

    @Column()
    isActive: boolean;
}
