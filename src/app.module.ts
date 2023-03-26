import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@config/db/ormconfig';
import { AuthModule } from '@authentication/auth.module';
import { JobsModule } from '@jobs/job.module';
import { AuthMiddleware } from '@authentication/auth.middleware';
import { UsersModule } from '@models/users.module';

@Module({
   imports: [TypeOrmModule.forRoot(config), ConfigModule, UsersModule, AuthModule, JobsModule],
   providers: [],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('*');
   }
}
