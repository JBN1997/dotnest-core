import { Module } from '@nestjs/common';
import { ErrorLogger } from '@logger/error/error.logger';

@Module({
   imports: [ErrorLogger],
   controllers: [],
   providers: [ErrorLogger],
   exports: [ErrorLogger],
})
export class LoggerModule {}
