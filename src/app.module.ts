import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@models/users/users.module';
import { AuthModule } from '@authentication/auth.module';
import { JobsModule } from '@jobs/job.module';
import { LoggerModule } from '@logger/logger.module';
import { AuthMiddleware } from '@authentication/auth.middleware';
import { SubscriberModule } from '@subscriber/subscriber.module';
import config from '@config/db/ormconfig';

@Module({
   imports: [
      TypeOrmModule.forRoot(config),
      ConfigModule,
      UsersModule,
      AuthModule,
      JobsModule,
      LoggerModule,
      SubscriberModule
   ],
   controllers: [],
   providers: [],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('*');
   }
}
