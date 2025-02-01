import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest()
        const {method, url} = request

        console.log(`[${method}] ${url} - Iniciando...`)
        const start = Date.now()

        return next.handle().pipe(
            tap(() => console.log(`[${method}] ${url} - Finalizando em ${Date.now() - start}ms`))
        )
    }
}