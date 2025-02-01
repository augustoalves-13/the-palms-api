import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { UsersModule } from './modules/users/users.module';
import { EscortsModule } from './modules/escorts/escorts.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, EscortsModule, AuthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
