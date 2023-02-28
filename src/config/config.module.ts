import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { EnvConfigModule } from '@config/env/env.module';
import environment from '@config/env/env.provider';

@Module({
   imports: [
      NestConfigModule.forRoot({
         load: [environment],
         isGlobal: true,
         envFilePath: `.env`,
      }),
      EnvConfigModule,
   ],
   providers: [],
   exports: [EnvConfigModule],
})
export class ConfigModule {}
