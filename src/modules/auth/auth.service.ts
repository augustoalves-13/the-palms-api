import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserTypes } from 'src/common/types/userTypes';
import { db } from 'src/config/database.config';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {

    async auth({ email, password }: UserTypes) {
        const user = await db.user.findFirst({
            where: {
                email
            }
        })

        if (!user)
            throw new HttpException('E-mail ou senha inválidos', HttpStatus.UNAUTHORIZED)

        const passwordMatch = bcrypt.compare(password as string, user.password)

        if (!passwordMatch)
            throw new HttpException('E-mail ou senha inválidos', HttpStatus.UNAUTHORIZED)

        const authToken = jwt.sign(
            {
                id: user.id,
                name: user.name
            },
            'Alviverde13!',
            {
                subject: String(user.id),
                expiresIn: '90d'
            }
        )

        return this.omitPassword({...user, token: authToken} as UserTypes)
    }

    private omitPassword(user: UserTypes) {
        const { password, ...rest } = user

        return rest
    }

}
