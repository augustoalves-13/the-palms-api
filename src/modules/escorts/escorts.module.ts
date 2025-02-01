import { Module } from '@nestjs/common';
import { EscortsService } from './escorts.service';
import { EscortsController } from './escorts.controller';

@Module({
  providers: [EscortsService],
  controllers: [EscortsController]
})
export class EscortsModule {}
