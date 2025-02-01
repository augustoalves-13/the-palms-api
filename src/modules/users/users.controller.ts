import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserSwaggerExamples } from 'src/common/swagger/users.example';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { UserTypes } from 'src/common/types/userTypes';


@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create Users' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: UserSwaggerExamples
            }
        }
    })
    async create(@Body() body: CreateUserDto){
        return this.service.create(body as UserTypes)
    }

    @Get()
    @ApiOperation({ summary: 'Get Users' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: [UserSwaggerExamples]
            }
        }
    })
    get(){
        return this.service.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get User' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: UserSwaggerExamples
            }
        }
    })
    @ApiParam({
        name: 'id',
        type: Number
    })
    async getById(@Param('id') id: number){
        return this.service.getById(Number(id))
    } 

    @Patch('/:id')
    @ApiOperation({ summary: 'Update User' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: UserSwaggerExamples
            }
        }
    })
    @ApiParam({
        name: 'id',
        type: Number
    })
    async update(@Param('id') id: number, @Body() body: UpdateUserDto){
        return this.service.update(body as UserTypes, Number(id))
    } 

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete Users' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: {...UserSwaggerExamples, deleted_at: Date()}
            }
        }
    })
    @ApiParam({
        name:'id',
        type: Number
    })
    async delete(@Param('id') id: number){
        return this.service.delete(Number(id))
    }
}
