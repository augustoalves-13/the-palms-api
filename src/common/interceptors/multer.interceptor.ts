import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as multer from 'multer';
import { extname } from 'path';
import { Request, Response } from 'express';

export function MulterFileInterceptor(fields: { name: string; maxCount?: number }[]): Type<NestInterceptor> {
    @Injectable()
    class MulterFieldsInterceptor implements NestInterceptor {
        private multerInstance = multer({
            storage: multer.diskStorage({
                destination: './storage',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
            limits: { fileSize: 10 * 1024 * 1024 },
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    return callback(null, false);
                }
                callback(null, true);
            },
        }).fields(fields);

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const ctx = context.switchToHttp();
            const req = ctx.getRequest<Request>();
            const res = ctx.getResponse<Response>();

            return new Promise((resolve, reject) => {
                this.multerInstance(req, res, (err: any) => {
                    if (err) {
                        return reject(new BadRequestException(err.message || 'Erro ao fazer upload dos arquivos.'));
                    }

                    const files = this.convertToObject(req.files);

                    if (!files.face_photo || !files.primary_body_photo || !files.secondary_body_photo) {
                        return reject(new BadRequestException('Todas as 3 imagens são obrigatórias!'));
                    }

                    resolve(next.handle());
                });
            });
        }

        private convertToObject(files: any): { [fieldname: string]: Express.Multer.File[] } {
            if (!files) return {};

            return Object.keys(files).reduce((acc, key) => {
                acc[key] = files[key];
                return acc;
            }, {});
        }
    }       

    return MulterFieldsInterceptor;
}
