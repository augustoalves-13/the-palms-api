import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EscortsTypes } from 'src/common/types/escortsTypes';
import { db } from 'src/config/database.config';

@Injectable()
export class EscortsService {
    async create(data: EscortsTypes){
        const {
            name,
            face_photo,
            primary_body_photo,
            secondary_body_photo,
            status
        } = data

        const response = await db.escort.create({
            data: {
                name,
                face_photo,
                primary_body_photo,
                secondary_body_photo,
                status: Number(status)
            }
        })

        return response 
    }

    async getAll(){
        const response = await db.escort.findMany()

        return response
    }

    async getById(id: number){
        const response = await db.escort.findFirst({
            where: {id}
        })

        if(!response)
            throw new HttpException('Nenhum dado encontrado', HttpStatus.NOT_FOUND)

        return response
    }

    async update(data: EscortsTypes, id: number){
        const {
            name,
            face_photo,
            primary_body_photo,
            secondary_body_photo,
            status
        } = data

        const response = await db.escort.update({
            data: {
                name,
                face_photo,
                primary_body_photo,
                secondary_body_photo,
                status
            },
            where: { id }
        })

        if(!response)
            throw new HttpException('Não foi possível completar a operação', HttpStatus.BAD_REQUEST)

        return response
    }

    async delete(id: number){
        const response = await db.escort.delete({
            where: {id}
        })

        if(!response)
            throw new HttpException('Não foi possível completar a operação', HttpStatus.BAD_REQUEST)

        return response
    }
}
