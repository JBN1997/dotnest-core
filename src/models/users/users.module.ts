import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from 'src/authentication/services/password.service';
import { UserLog } from './entities/user-log.entity';
import { UserSnapshot } from './entities/user-snapshot.entity';
import { User } from './entities/user.entity';
import { UserLogSubscriber } from './events/log-subscriber.event';
import { UserSnapshotRepository } from './repositories/user-snapshot.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UsersController } from './users.controller';

@Module({
   imports: [TypeOrmModule.forFeature([User, UserSnapshot, UserLog])],
   controllers: [UsersController],
   providers: [UserService, PasswordService, UserRepository, UserSnapshotRepository, UserLogSubscriber],
   exports: [UserService],
})
export class UsersModule {}
