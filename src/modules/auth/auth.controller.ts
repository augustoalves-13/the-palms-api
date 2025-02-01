import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from 'src/dto/auth.dto';
import { UserTypes } from 'src/common/types/userTypes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserSwaggerExamples } from 'src/common/swagger/users.example';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @Post()
    @ApiOperation({ summary: 'Auth Users' })
    @ApiResponse({
        status: 200,
        content: {
            'application/json': {
                example: UserSwaggerExamples
            }
        }
    })
    async auth(@Body() body: AuthLoginDto) {
        const { email, password } = body

        return this.service.auth({ email, password } as UserTypes)
    }

}
