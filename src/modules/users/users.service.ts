import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserTypes } from 'src/common/types/userTypes';
import { db } from 'src/config/database.config';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class UsersService {
    async create(data: UserTypes) {
        const {
            name,
            email,
            password
        } = data

        if (!password || password?.length < 6)
            throw new HttpException('A senha deve ter no mínimo 6 caracteres', HttpStatus.UNAUTHORIZED)

        const existingEmail = await db.user.findFirst({
            where: {
                email
            }
        })

        if (existingEmail)
            throw new HttpException('Já existe um usuário cadastrado com esse e-mail', HttpStatus.CONFLICT)

        const hashedPassword = await bcrypt.hash(password, 10)

        const response = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return this.omitPassword(response as UserTypes)
    }

    async getAll() {
        const response = await db.user.findMany()

        return response.map(user => ({ ...this.omitPassword(user as UserTypes) }))
    }

    async getById(id: number){
        const response = await db.user.findFirst({
            where: {
                id
            }
        })

        if(!response)
            throw new HttpException('Nenhum usuário encontrado', HttpStatus.NOT_FOUND)

        return this.omitPassword(response as UserTypes)
    }

    async update(data: UserTypes, id: number){
        const {
            name,
            email
        } = data

        const response = await db.user.update({
            data: {
                name,
                email
            },
            where: { id }
        })

        if(!response)
            throw new HttpException('Nenhum usuário encontrado', HttpStatus.NOT_FOUND)

        return this.omitPassword(response as UserTypes)
    }

    async delete(id: number) {
        const response = await db.user.delete({
            where: {
                id
            }
        })

        return this.omitPassword(response as UserTypes)
    }


    private omitPassword(user: UserTypes) {
        const { password, ...rest } = user

        return rest
    }
}
