import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@config/env/env.module';
import { EnvConfigService } from '@config/env/env.service';
import { ConfigModule } from '@config/config.module';

@Module({
   imports: [ConfigModule],
   controllers: [],
   providers: [
      {
         provide: 'EnvConfigService',
         useExisting: EnvConfigService,
      },
   ],
})
export class AppModule {}
