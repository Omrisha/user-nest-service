import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/filter/http-exception-filter';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.service.getUsers();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
        return this.service.getUser(id);
    }

    @Post()
    create(@Body() user: CreateUser): Promise<User> {
        return this.service.createUser(user);
    }

    @Put()
    @UseFilters(HttpExceptionFilter)
    update(@Body() user: UpdateUser) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param('id', new ParseIntPipe()) id: number) {
        this.service.deleteUser(id);
    }
}
