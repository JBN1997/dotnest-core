import { Module } from '@nestjs/common';
import { ErrorLogger } from '@logger/error/error.logger';
import { WarnLogger } from './warn/warn.logger';

@Module({
   imports: [],
   controllers: [],
   providers: [ErrorLogger, WarnLogger],
   exports: [ErrorLogger, WarnLogger],
})
export class LoggerModule {}
