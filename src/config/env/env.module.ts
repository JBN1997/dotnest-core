import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { EnvConfigService } from '@config/env/env.service';

@Module({
   imports: [NestConfigModule],
   providers: [EnvConfigService],
   exports: [EnvConfigService],
})
export class EnvConfigModule {}
