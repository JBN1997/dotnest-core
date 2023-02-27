import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { EnvConfigService } from '@config/env/env.service';

@Module({
   imports: [forwardRef(() => ConfigModule)],
   providers: [EnvConfigService],
   exports: [EnvConfigService],
})
export class EnvConfigModule {}
