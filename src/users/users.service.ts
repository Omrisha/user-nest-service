import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async getUsers(user: User): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(_id: number): Promise<User[]> {
        return await this.userRepository.find({
            select: ["fullName", "birthDate", "isActive"],
            where: [{ "id": _id }]
        });
    }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

    async updateUser(user: User) {
        this.userRepository.save(user);
    }

    async deleteUser(_id: number) {
        this.userRepository.delete({ "id": _id });
    }
}
