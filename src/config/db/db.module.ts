import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { DataBaseConfigService } from '@config/db/db.service';

@Module({
   imports: [NestConfigModule],
   providers: [DataBaseConfigService],
   exports: [DataBaseConfigService],
})
export class DataBaseConfigModule {}
