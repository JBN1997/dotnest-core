import { Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@models/users/users.module';
import config from '@config/db/ormconfig';

@Module({
   imports: [TypeOrmModule.forRoot(config), ConfigModule, UsersModule],
   controllers: [],
   providers: [],
})
export class AppModule {}
