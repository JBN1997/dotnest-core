import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { EnvConfigModule } from '@config/env/env.module';
import { DataBaseConfigModule } from '@config/db/db.module';
import environment from '@config/env/env.provider';
import db from '@config/db/db.provider';
import { EnvConfigService } from './env/env.service';

@Module({
   imports: [
      NestConfigModule.forRoot({
         load: [environment, db],
         isGlobal: true,
         envFilePath: `.env`,
      }),
      EnvConfigModule,
      DataBaseConfigModule,
   ],
   providers: [],
   exports: [EnvConfigModule, DataBaseConfigModule],
})
export class ConfigModule {}
