import { Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@models/users/users.module';
import config from '@config/db/ormconfig';
import { AuthModule } from './authentication/auth.module';

@Module({
   imports: [TypeOrmModule.forRoot(config), ConfigModule, UsersModule, AuthModule],
   controllers: [],
   providers: [],
})
export class AppModule {}
