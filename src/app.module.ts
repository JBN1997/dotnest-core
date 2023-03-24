import { Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@models/users/users.module';
import { AuthModule } from './authentication/auth.module';
import { JobsModule } from '@jobs/job.module';
import { LoggerModule } from '@logger/logger.module';
import config from '@config/db/ormconfig';

@Module({
   imports: [
      TypeOrmModule.forRoot(config),
      ConfigModule,
      UsersModule,
      AuthModule,
      JobsModule,
      LoggerModule
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
