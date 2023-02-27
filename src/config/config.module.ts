import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService as NestConfigService } from '@nestjs/config';
import { EnvConfigService } from '@config/env/env.service';
import { EnvConfigModule } from '@config/env/env.module';
import environment from '@config/env/env.provider';

@Module({
   imports: [
      NestConfigModule.forRoot({
         load: [environment],
         isGlobal: true,
         envFilePath: `.env`,
      }),
      forwardRef(() => EnvConfigModule),
   ],
   providers: [NestConfigService, EnvConfigService],
   exports: [NestConfigService, EnvConfigService],
})
export class ConfigModule {}
