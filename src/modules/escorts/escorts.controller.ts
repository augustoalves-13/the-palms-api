import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EscortsService } from './escorts.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateEscortDto } from 'src/dto/escort.dto';
import { EscortsTypes } from 'src/common/types/escortsTypes';
import { EscortsSwaggerExamples } from 'src/common/swagger/escorts.example';

@Controller('escorts')
export class EscortsController {
    constructor(private readonly service: EscortsService) { }

    @Post()
    @ApiOperation({ summary: 'Create Escorts' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: EscortsSwaggerExamples
            }
        }
    })
    async create(@Body() body: CreateEscortDto) {
        return this.service.create(body as EscortsTypes)
    }

    @Get()
    @ApiOperation({ summary: 'Get Escorts' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: [EscortsSwaggerExamples]
            }
        }
    })
    get() {
        return this.service.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get Escort' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: EscortsSwaggerExamples
            }
        }
    })
    @ApiParam({
        name: 'id',
        type: Number
    })
    async getById(@Param('id') id: number) {
        return this.service.getById(Number(id))
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update Escort' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: EscortsSwaggerExamples
            }
        }
    })
    @ApiParam({
        name: 'id',
        type: Number
    })
    async update(@Param('id') id: number, @Body() body: CreateEscortDto) {
        return this.service.update(body as EscortsTypes, Number(id))
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete Escort' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: {...EscortsSwaggerExamples, deleted_at: Date()}
            }
        }
    })
    @ApiParam({
        name: 'id',
        type: Number
    })
    async delete(@Param('id') id: number) {
        return this.service.delete(Number(id))
    }
}
