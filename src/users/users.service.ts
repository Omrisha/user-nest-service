import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(_id: number): Promise<User> {
        return await this.userRepository.findOne({
            select: ["fullName", "birthDate", "isActive"],
            where: [{ "id": _id }]
        });
    }

    async createUser(createUserDto: CreateUser): Promise<User> {
        const user = new User();
        user.fullName = createUserDto.fullName;
        user.birthDate = createUserDto.birthDate;
        user.isActive = createUserDto.isActive;

        return await this.userRepository.save(user);
    }

    async updateUser(user: UpdateUser): Promise<number> {
        return await (await this.userRepository.update(user.id, { "fullName": user.fullName, "isActive": user.isActive })).affected;
    }

    async deleteUser(_id: number) {
        this.userRepository.delete({ "id": _id });
    }
}
